import e from "express";
import UserController from "../Controllers/UserController.mjs";
import passport from "../Passport/passport-config.mjs";
import InputValidationUserMiddleware from "../Middlewares/inputValidationUserMiddleware.mjs";
import multerUploadMiddleware from "../Multer/multer-config.mjs";
import CustomError from "../Utils/CustomError.mjs";
import "dotenv/config";

const UserRouter = e.Router();
UserRouter.post("/register", UserController.registerUser);
UserRouter.post("/login", UserController.loginUser);
UserRouter.get("/handshake-hello", UserController.handshakeHello);
UserRouter.get(
  "/get-specific-user-info/:username",
  passport.authenticate("jwt", { session: false }),
  UserController.getSpecificUserInfo
);
UserRouter.get(
  "/get-current-user-info",
  passport.authenticate("jwt", { session: false }),
  UserController.getCurrentUserInfo
);
UserRouter.get(
  "/get-all-the-users-except-current-one",
  passport.authenticate("jwt", { session: false }),
  UserController.getAllTheUsersExceptCurrentOne
);

UserRouter.put(
  "/follow-user",
  passport.authenticate("jwt", { session: false }),
  InputValidationUserMiddleware,
  UserController.followUser
);
UserRouter.put(
  "/unfollow-user",
  passport.authenticate("jwt", { session: false }),
  InputValidationUserMiddleware,
  UserController.unFollowUser
);
UserRouter.put(
  "/update-profile",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    multerUploadMiddleware(req, res, (err) => {
      if (err) {
        console.log(err);
        next(
          new CustomError(
            400,
            err.message +
              " max. allowed fileSize: " +
              process.env.MAX_ALLOWED_FILE_UPLOAD_SIZE +
              "KB"
          )
        );
      } else {
        next();
      }
    });
  },
  UserController.updateProfile
);

export default UserRouter;
