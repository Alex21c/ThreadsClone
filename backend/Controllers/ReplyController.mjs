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

const ReplyController = {createNewReply, deleteAReply};
export default ReplyController;