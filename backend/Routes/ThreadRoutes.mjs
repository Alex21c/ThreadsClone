import e from "express";
import ThreadController from "../Controllers/ThreadController.mjs";
import passport from "../Passport/passport-config.mjs";
import InputValidationThreadMiddleware from "../Middlewares/InputValidationThreadMiddleware.mjs";
import multerUploadMiddleware from "../Multer/multer-config.mjs";
import CustomError from "../Utils/CustomError.mjs";
import 'dotenv/config';

const ThreadRouter = e.Router();
ThreadRouter.post('/create-new-thread', passport.authenticate('jwt', {session: false}), (req,res,next)=>{
  multerUploadMiddleware(req, res, (err) => {
    if (err) {
      next(new CustomError(400, err.message, " max. allowed fileSize: " + process.env.MAX_ALLOWED_FILE_UPLOAD_SIZE + "KB"));
    } else {
      next();
    }
  });

}, ThreadController.createNewThread);

ThreadRouter.put('/like-a-thread', passport.authenticate('jwt', {session: false}), InputValidationThreadMiddleware, ThreadController.likeAThread);

ThreadRouter.put('/unlike-a-thread', passport.authenticate('jwt', {session: false}), InputValidationThreadMiddleware, ThreadController.unlikeAThread);

ThreadRouter.delete('/delete-a-thread', passport.authenticate('jwt', {session: false}), InputValidationThreadMiddleware, ThreadController.deleteAThread);

export default ThreadRouter;