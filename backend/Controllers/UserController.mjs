import UserModel from "../Models/UserModel.mjs";
import CustomError from "../Utils/CustomError.mjs";
import Utils from "../Utils/Utils.mjs";


const registerUser= async (req, res, next)=>{
  try {
    

    // Validations
    /// Does email already exist?
    if(await UserModel.findOne({email: req.body.email})){
      return next(new CustomError(400, "email already exist!"))
    }
    /// Does mobile already exist?
    if(await UserModel.findOne({mobile: req.body.mobile})){
      return next(new CustomError(400, "mobile already exist!"))
    }
    /// Does username already exist?
    if(await UserModel.findOne({username: req.body.username})){
      return next(new CustomError(400, "username already exist!"))
    }
  
    // Encrypt the password
      req.body.password= await Utils.generatePasswordHash(req.body.password);
console.log(req.body);

    // Create a new document inside User Collection
      const userDoc = new UserModel(req.body);
      
    // // Save the doc
      userDoc.save();
  
    // Generate JWT Token
      const Authorization = Utils.generateJwtToken(userDoc);

    // Return success message with JWT Token
      return res.status(201).json({
        success: true, 
        Authorization
      });
    
    
  } catch (error) {
    return next(new CustomError(500, error.message));
  }
}

const UserController = {registerUser};
export default UserController;