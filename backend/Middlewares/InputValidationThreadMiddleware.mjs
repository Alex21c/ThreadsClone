import ThreadModel from "../Models/ThreadModel.mjs";
import CustomError from "../Utils/CustomError.mjs";
import mongoose from "mongoose";
export default async function InputValidationThreadMiddleware(req, res, next){
  try {        
    const {threadID} = req.body;
    if(!threadID){
      return next(new CustomError(400, "Missing threadID in the request !"));      
    } 
    // validate is it valid ID?
    if(!mongoose.Types.ObjectId.isValid(threadID)){
      return next(new CustomError(400, `Provided  threadID: ${threadID}  is invalid !`));            
    }
    
    // does thread with this id exist ?
    const thread = await ThreadModel.findById(threadID);
    if(!thread){
      return next(new CustomError(404, `Thread Not Found !`));            
    }

    // append thread doc to req
    req.thread = thread;
  
    // allow to proceed
    next();
  } catch (error) {
    return next(new CustomError(500, "Input validation failed for Thread Middleware, ERR: ", error.message));
  }
}