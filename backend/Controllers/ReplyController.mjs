import UserModel from "../Models/UserModel.mjs";
import ThreadModel from "../Models/ThreadModel.mjs";
import CustomError from "../Utils/CustomError.mjs";
import mongoose from "mongoose";


const deleteAReply = async (req, res, next)=>{
  try {    

    // remove replyID from parent thread
      req.thread.replies.pull(req.reply._id);
      req.thread.save();

    // delete the reply itself
      await req.reply.deleteOne();

    res.json({
      success: true, 
      message: "Reply deleted Successfully !"
    });
  } catch (error) {
    console.log(error.message);
    return next(new CustomError(500, "Cannot delete a reply, ERROR: "+ error.message));
  }
}
const createNewReply = async (req, res, next)=>{
  try {
    //Create a new thread
      const {bodyText} = req.body;
      // console.log(req.body);
      // first check if bodyText empty 
        if(!bodyText){
          return next(new CustomError(200, "Cannot create empty reply, make sure you provide some text as reply body!"));
        }
      // append additonal info      
        req.body.createdBy = req.user._id;
        req.body.replyBelongsToThisThreadID = req.thread._id;
        req.body.replyBelongsToThreadCreatedByThisUser = req.thread.createdBy;
        req.body.bodyImage=null; // not allowing images in replies
  
      // Create a new document
        const reply = new ThreadModel(req.body);
        reply.save();
        
    //push id of newly created thread as the reply of parent thread
        req.thread.replies.push(reply._id);
        req.thread.save();

    // return success
        res.status(201).json({
          success: true, 
          message: "Reply made Successfully !",
          replyID: reply._id
        });
    
  } catch (error) {
    // console.log(error)
    return next(new CustomError(500, "Cannot create a reply, ERROR: "+ error.message));
  }

}
const getAllTheRepliesMadeByCurrentUser = async(req, res, next)=>{
  try {
      const threadsCreatedByCurrentUser = await ThreadModel.find({ createdBy: req.user._id, replyBelongsToThreadCreatedByThisUser: { $ne: null } })
      .populate({
        path: 'replies',
        populate: {
          path: 'createdBy',
          select: 'username profileImage'
        }
      })
      .populate({
        path: 'replyBelongsToThisThreadID',
        populate: {
          path: 'createdBy',
          select: 'username profileImage'
        }
      })      
      .populate('createdBy', 'username profileImage')
      .sort({ createdAt: -1 });
      // console.log(threadsCreatedByCurrentUser);
    // if no thread are there just send success false
      if(threadsCreatedByCurrentUser.length === 0){
        return res.json({
          success: false, 
          message: `hello ${req.user.username}, You havn't made any replies yet!`
        })
      }
    // send the threads back 
      res.json({
        success: true, 
        data: threadsCreatedByCurrentUser
      })
    
  } catch (error) {
    return next(new CustomError(500, "failed to fetch all the threads, ERROR: "+ error.message));
  }
}
const getAllTheRepliesMadeBySpecificUser = async(req, res, next)=>{
    // does there is any username ?
    const {username} = req.params;
    if(!username){        
      return next(new CustomError(400, "Missing username inside params !"));
    }

    // just find the db if there is any user matching ?
    const specificUser =  await UserModel.findOne({username});

    if(!specificUser){
    return next(new CustomError(500, "User not found !"));
    }
    // update req.user
    req.user = specificUser;


  try {
      const threadsCreatedByCurrentUser = await ThreadModel.find({ createdBy: req.user._id, replyBelongsToThreadCreatedByThisUser: { $ne: null } })
      .populate({
        path: 'replies',
        populate: {
          path: 'createdBy',
          select: 'username profileImage'
        }
      })
      .populate({
        path: 'replyBelongsToThisThreadID',
        populate: {
          path: 'createdBy',
          select: 'username profileImage'
        }
      })      
      .populate('createdBy', 'username profileImage')
      .sort({ createdAt: -1 });
      // console.log(threadsCreatedByCurrentUser);
    // if no thread are there just send success false
      if(threadsCreatedByCurrentUser.length === 0){
        return res.json({
          success: false, 
          message: `hello ${req.user.username}, You havn't made any replies yet!`
        })
      }
    // send the threads back 
      res.json({
        success: true, 
        data: threadsCreatedByCurrentUser
      })
    
  } catch (error) {
    return next(new CustomError(500, "failed to fetch all the threads, ERROR: "+ error.message));
  }
}

const ReplyController = {createNewReply, deleteAReply, getAllTheRepliesMadeByCurrentUser, getAllTheRepliesMadeBySpecificUser};
export default ReplyController;