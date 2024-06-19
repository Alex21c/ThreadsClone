import ThreadModel from "../Models/ThreadModel.mjs";
import CustomError from "../Utils/CustomError.mjs";
import mongoose from "mongoose";
const createNewThread = async (req, res, next)=>{
  try {
    const {bodyText, bodyImage} = req.body;
    console.log(req.body);
    // first check if both text or image are empty 
      if(!bodyText && !bodyImage){
        return next(new CustomError(200, "Cannot create empty thread, make sure you provide either image or text as body!"));
      }
    // append userID
      req.body.createdBy = req.user._id;

    // Create a new document
      const doc = new ThreadModel(req.body);
      doc.save();

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
    // then push the current user id to the likes
      req.thread.likes.pull(req.user._id);
      req.thread.save();

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
    console.log(req.thread)
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