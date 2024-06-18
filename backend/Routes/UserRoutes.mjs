import e from "express";
import UserController from "../Controllers/UserController.mjs";
const UserRouter = e.Router();
UserRouter.post('/register', UserController.registerUser);
UserRouter.post('/login', UserController.loginUser);

export default UserRouter;