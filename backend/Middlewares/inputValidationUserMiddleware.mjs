import UserModel from "../Models/UserModel.mjs";
import CustomError from "../Utils/CustomError.mjs";
import mongoose from "mongoose";
export default async function InputValidationUserMiddleware(req, res, next){
  try {           

    // otherwise
    const {userID} = req.body;

    if(!userID){
      return next(new CustomError(400, `Missing userID inside request body !`));            
    }

    // validate is it valid User ID?
    if(!mongoose.Types.ObjectId.isValid(userID)){
      return next(new CustomError(400, `Provided  userID: ${userID}  is invalid !`));            
    }
    
    // does user exist in DB ?
    const user = await UserModel.findById(userID);      
    if(!user){
      return next(new CustomError(400, `User doesn't exist !`));    
    }
      
    // append to the req
    req.user2 = user;


    // allow to proceed
    next();
  } catch (error) {
    return next(new CustomError(500, "Input validation failed for User Middleware, ERR: "+ error.message));
  }
}