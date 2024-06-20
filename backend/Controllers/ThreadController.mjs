import ThreadModel from "../Models/ThreadModel.mjs";
import CustomError from "../Utils/CustomError.mjs";
import mongoose from "mongoose";
import CloudinaryHelper from '../Utils/CloudinaryHelper.mjs';
import fs from "fs";

const createNewThread = async (req, res, next)=>{
  try {    
    const {bodyText} = req.body;
    const bodyImage = req?.file;
    
    // console.log(req.body);
    // first check if both text or image are empty 
      if(!bodyText && !bodyImage){
        return next(new CustomError(200, "Cannot create empty thread, make sure you provide either image or text as body!"));
      }

    
    // append userID
      req.body.createdBy = req.user._id;

    // Create a new document
      const doc =  new ThreadModel(req.body);
      // upload image file to clodinary
      if(bodyImage){
        try {        
          const objCloudinary = new CloudinaryHelper();
          const response = await objCloudinary.uploadFile(bodyImage, `ThreadsClone/${doc._id}`); 
          if(!response){
            throw new Error("failed to upload file");          
          }

          const imgData = {
            public_id: response.public_id,
            url: response.secure_url,
          };
          doc.bodyImage = imgData;


        } catch (error) {          
          return next(new CustomError(500, "Failed to upload image file to server ! ", error.message));
        } finally{
          // delete file from uploads dir
          setTimeout(()=>{fs.unlinkSync(req.file.path);}, 2000);
          
        }
      }

      await doc.save();

    // response back
      res.status(201).json({
        success: true, 
        message: "Thread Created Successfully !",
        threadID: doc._id
      });

  } catch (error) {
    return next(new CustomError(500, "Cannot create a thread, ERROR: "+ error.message));
  }
}


const likeAThread = async(req, res, next)=>{
  try {
    
    // then push the current user id to the likes      
      req.thread.likes.addToSet(req.user._id);
      req.thread.save();

    // now push the thread ID into the users likedThreads array as well
      req.user.likedThreads.addToSet(req.thread._id);
      req.user.save();

    // response success !

    // response
      res.json({
        success: true, 
        message: "Liked Successfully !",
        totalLikes: req.thread.likes.length
      })
  } catch (error) {
    return next(new CustomError(500, "Cannot like a thread, ERROR:"+ error.message));
  }
}

const unlikeAThread = async(req, res, next)=>{
  try{
    // then pull the current user id to the likes
      req.thread.likes.pull(req.user._id);
      req.thread.save();

    // now push the thread ID into the users likedThreads array as well
      req.user.likedThreads.pull(req.thread._id);
      req.user.save();

    // response success !

    // response
      res.json({
        success: true, 
        message: "Un-Liked Successfully !",
        totalLikes: req.thread.likes.length
      })
  } catch (error) {
    return next(new CustomError(500, "Cannot unlike a thread, ERROR:"+ error.message));
  }
}

const deleteAThread = async(req, res, next)=>{
  try{
    // check if this thread is created by current user?
      if(req.thread.createdBy.toString() !== req.user._id.toString()){
        return next (new CustomError(400, "Not allowed, this thread doesn't belogs to You, it was created by other user!"));
      }

    // remove the doc
    // console.log(req.thread)
      await req.thread.deleteOne();

    // response success !    
      res.json({
        success: true, 
        message: "Thread Deleted Successfully !",        
      })
  } catch (error) {
    return next(new CustomError(500, "Cannot delete a thread, ERROR:"+ error.message));
  }
}




const ThreadController = {createNewThread, likeAThread, unlikeAThread, deleteAThread};
export default ThreadController;