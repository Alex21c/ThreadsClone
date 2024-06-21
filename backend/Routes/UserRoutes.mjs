import e from "express";
import UserController from "../Controllers/UserController.mjs";
import passport from "../Passport/passport-config.mjs";

const UserRouter = e.Router();
UserRouter.post('/register', UserController.registerUser);
UserRouter.post('/login', UserController.loginUser);
UserRouter.get('/get-current-user-info',passport.authenticate('jwt', {session: false}), UserController.getCurrentUserInfo);

export default UserRouter;