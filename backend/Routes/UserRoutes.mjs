import e from "express";
import UserController from "../Controllers/UserController.mjs";
const UserRouter = e.Router();
UserRouter.post('/register', UserController.registerUser);

export default UserRouter;