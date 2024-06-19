import e from "express";
import ThreadController from "../Controllers/ThreadController.mjs";
import passport from "../Passport/passport-config.mjs";
import InputValidationThreadMiddleware from "../Middlewares/InputValidationThreadMiddleware.mjs";

const ThreadRouter = e.Router();
ThreadRouter.post('/create-new-thread', passport.authenticate('jwt', {session: false}), ThreadController.createNewThread);
ThreadRouter.post('/like-a-thread', passport.authenticate('jwt', {session: false}), InputValidationThreadMiddleware, ThreadController.likeAThread);
ThreadRouter.post('/unlike-a-thread', passport.authenticate('jwt', {session: false}), InputValidationThreadMiddleware, ThreadController.unlikeAThread);

export default ThreadRouter;