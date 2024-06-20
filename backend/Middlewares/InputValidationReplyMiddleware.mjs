import ThreadModel from "../Models/ThreadModel.mjs";
import CustomError from "../Utils/CustomError.mjs";
import mongoose from "mongoose";
export default async function InputValidationReplyMiddleware(req, res, next){
  try {            
    // processing replyBelongsToThisThreadID
      const {replyBelongsToThisThreadID} = req.body;
      if(!replyBelongsToThisThreadID){
        return next(new CustomError(400, "Missing replyBelongsToThisThreadID in the request !"));      
      } 
      // validate is it valid ID?
      if(!mongoose.Types.ObjectId.isValid(replyBelongsToThisThreadID)){
        return next(new CustomError(400, `Provided  replyBelongsToThisThreadID: ${replyBelongsToThisThreadID}  is invalid !`));            
      }
      
      // does thread with this id exist ?
      const replyBelongsToThisThread = await ThreadModel.findById(replyBelongsToThisThreadID);
      if(!replyBelongsToThisThread){
        return next(new CustomError(404, `Thread Not Found !`));            
      }

      // append thread doc to req
      req.replyBelongsToThisThread = replyBelongsToThisThread;

    // Processing replyID
      if(req.body?.req && req.body.req === "delete-a-reply"){
        const {replyID} = req.body;        
        if(!replyID){
          return next(new CustomError(400, "Missing replyID in the request !"));      
        } 
        // validate is it valid ID?
        if(!mongoose.Types.ObjectId.isValid(replyID)){
          return next(new CustomError(400, `Provided  replyID: ${replyID}  is invalid !`));            
        }
        
        // does thread with this id exist ?
        const reply = await ThreadModel.findById(replyID);
        if(!reply){
          return next(new CustomError(404, `Reply Not Found !`));            
        }
  
        // append thread doc to req
        req.reply = reply;
      }


    // allow to proceed
    next();
  } catch (error) {
    return next(new CustomError(500, "Input validation failed for Thread Middleware, ERR: ", error.message));
  }
}