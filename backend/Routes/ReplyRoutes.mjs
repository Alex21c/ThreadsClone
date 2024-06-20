import e from "express";
import ReplyController from "../Controllers/ReplyController.mjs";
import passport from "../Passport/passport-config.mjs";
import InputValidationReplyMiddleware from "../Middlewares/InputValidationReplyMiddleware.mjs";

const ReplyRouter = e.Router();
ReplyRouter.post('/create-new-reply', passport.authenticate('jwt', {session: false}),InputValidationReplyMiddleware, ReplyController.createNewReply);
ReplyRouter.delete('/delete-a-reply', passport.authenticate('jwt', {session: false}),InputValidationReplyMiddleware, ReplyController.deleteAReply);


export default ReplyRouter;