import UserModel from "../Models/UserModel.mjs";
import CustomError from "../Utils/CustomError.mjs";
import Utils from "../Utils/Utils.mjs";
import validator from "validator";
import "dotenv/config";
import fs from "fs";

import CloudinaryHelper from "../Utils/CloudinaryHelper.mjs";
const registerUser = async (req, res, next) => {
  try {
    // Input Validations
    /// is it valid email?
    if (!validator.isEmail(req.body.email)) {
      return next(new CustomError(400, "invalid email !"));
    }
    /// is it valid 10 digits mobile number?
    if (
      !validator.isMobilePhone(req.body.mobile) ||
      req.body.mobile.length < 10
    ) {
      return next(new CustomError(400, "invalid mobile number !"));
    }

    // DB Validations
    /// Does email already exist?
    if (await UserModel.findOne({ email: req.body.email })) {
      return next(new CustomError(400, "email already exist!"));
    }
    /// Does mobile already exist?
    if (await UserModel.findOne({ mobile: req.body.mobile })) {
      return next(new CustomError(400, "mobile already exist!"));
    }
    /// Does username already exist?
    if (await UserModel.findOne({ username: req.body.username })) {
      return next(new CustomError(400, "username already exist!"));
    }

    // Encrypt the password
    req.body.password = await Utils.generatePasswordHash(req.body.password);
    // default profile image
    const imgData = {
      public_id: null, // actually it is provided by cloudinary, and helpful when deleting a resource
      url: process.env.DEFAULT_USER_PROFILE_IMAGE_URL,
    };
    req.body.profileImage = imgData;
    // console.log(req.body);

    // just check if alex21c exist, if so then let the current user be following him
    // on localhsot
    const alex21cMongoDbIDs = [
      "668bbb6b5226f4a722deab41",
      "667936c01a89c30b67dda396",
    ];

    // Create a new document inside User Collection
    const userDoc = new UserModel(req.body);

    await Promise.all(
      alex21cMongoDbIDs.map(async (id) => {
        try {
          let alex21cDoc = await UserModel.findById(id);
          if (alex21cDoc) {
            userDoc.following.push(id);
            // also add current user to the followers of alex21c
            alex21cDoc.followers.addToSet(userDoc._id);
            alex21cDoc.save();
          }
        } catch (error) {}
      })
    );

    // // Save the doc
    userDoc.save();

    // Generate JWT Token
    const Authorization = Utils.generateJwtToken(userDoc);

    // Return success message with JWT Token
    return res.status(201).json({
      success: true,
      Authorization,
    });
  } catch (error) {
    console.log(error);
    return next(new CustomError(500, error.message));
  }
};

const getCurrentUserInfo = async (req, res, next) => {
  const sanitizedUserInfo = await UserModel.findById(req.user._id).select(
    "-password"
  );

  res.json({
    success: true,
    data: sanitizedUserInfo,
  });
};

const loginUser = async (req, res, next) => {
  try {
    const { usernameOrEmailOrMobile, password } = req.body;
    if (!usernameOrEmailOrMobile || !password) {
      return next(new CustomError(400, "Credentials missing !"));
    }

    // first detect type of id
    let typeOfID = "username";
    if (validator.isEmail(usernameOrEmailOrMobile)) {
      typeOfID = "email";
    } else if (validator.isMobilePhone(usernameOrEmailOrMobile)) {
      typeOfID = "mobile";
    }

    // find the document
    const userDoc = await UserModel.findOne({
      [typeOfID]: usernameOrEmailOrMobile,
    });
    if (!userDoc) {
      return next(new CustomError(400, "No such User exist !"));
    }

    // verify the password
    if (!(await Utils.isPasswordValid(password, userDoc.password))) {
      return next(new CustomError(400, "Invalid Credentials !"));
    }
    // generate JWT
    const Authorization = Utils.generateJwtToken(userDoc);

    // response
    res.json({ success: true, Authorization });
  } catch (error) {
    return next(new CustomError(500, error.message));
  }
};

const unFollowUser = async (req, res, next) => {
  try {
    // first pop the current userID inside followers of other user who our current user just followed
    req.user2.followers.pop(req.user._id);
    req.user2.save();

    // pop the current userID inside current User following
    req.user.following.pop(req.user2._id);
    req.user.save();

    // return success
    res.json({
      success: true,
      message: `${req.user2.username} unfollowed successfully !`,
    });
  } catch (error) {
    return next(
      new CustomError(500, "Failed to follow user, ERROR: " + error.message)
    );
  }
};
const followUser = async (req, res, next) => {
  try {
    // first push the current userID inside followers of other user who our current user just followed
    req.user2.followers.addToSet(req.user._id);
    req.user2.save();

    // push the current userID inside current User following
    req.user.following.addToSet(req.user2._id);
    req.user.save();

    // return success
    res.json({
      success: true,
      message: `${req.user2.username} followed successfully !`,
    });
  } catch (error) {
    return next(
      new CustomError(500, "Failed to follow user, ERROR: " + error.message)
    );
  }
};

const handshakeHello = async (req, res) => {
  res.json({
    success: true,
    message: "hi there!",
  });
};

const getAllTheUsersExceptCurrentOne = async (req, res, next) => {
  try {
    const { howManyUsers } = req.query;
    // make to query to mongo db
    const allTheUsers = await UserModel.find({
      _id: { $ne: req.user._id },
    }).limit(
      howManyUsers ||
        Number(process.env.ByDefaultHowManyUsersToFetchForSearchPage) ||
        100
    );
    // check if it contains result
    if (allTheUsers.length === 0) {
      throw new Error("No users exist in DB !");
    }
    // return the result
    res.json({
      success: true,
      data: allTheUsers,
    });
  } catch (error) {
    return next(
      new CustomError(
        500,
        "Failed to getAllTheUsersExceptCurrentOne, " + error.message
      )
    );
  }
};

const getSpecificUserInfo = async (req, res, next) => {
  try {
    // does there is any username ?
    const { username } = req.params;
    if (!username) {
      return next(new CustomError(400, "Missing username inside params !"));
    }
    // just find the db if there is any user matching ?
    const specificUser = await UserModel.findOne({ username }).select(
      "-password -mobile -email"
    );

    if (!specificUser) {
      return next(new CustomError(500, "User not found !"));
    }

    res.json({
      success: true,
      data: specificUser,
    });
  } catch (error) {
    return next(
      new CustomError(500, "Failed to getSpecificUserInfo, " + error.message)
    );
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const { userBioUpdated, userCustomLinkUpdated } = req.body;
    //safeguard is customlink provided
    if (userCustomLinkUpdated) {
      // is it a valid url?
      if (!validator.isURL(userCustomLinkUpdated)) {
        throw new Error("url link provided is invalid !");
      }
    }

    // now check if image is present in cloudinary, then delete it
    // upload new image to cloudinary
    // update the user profile data including image
    const bodyImage = req?.file;
    const objCloudinary = new CloudinaryHelper();
    if (bodyImage) {
      try {
        // check for current profile public_id
        const public_id = req.user.profileImage.get("public_id");
        if (public_id) {
          // user earlier has updated his profile image, now its time to delete the older image file from cloudinary
          await objCloudinary.deleteFile(public_id);
        }
        // upload new profile image
        // now just upload the image to cloudinary and get its public_id
        const response = await objCloudinary.uploadFile(
          bodyImage,
          `${process.env.PRJ_NAME || "ThreadsClone"}/${
            req.user.username
          }-profileImage/`
        );
        if (!response) {
          throw new Error("failed to upload file");
        }

        const imgData = {
          public_id: response.public_id,
          url: response.secure_url,
        };
        req.user.profileImage = imgData;
      } catch (error) {
        throw error;
      } finally {
        // delete file from uploads dir
        setTimeout(() => {
          fs.unlinkSync(req.file.path);
        }, 2000);
      }
    }

    // update bio if present
    if (userBioUpdated && req?.user?.bio != userBioUpdated) {
      req.user.bio = userBioUpdated;
    }
    // update customLink if present
    if (
      userCustomLinkUpdated &&
      req?.user?.customLink != userCustomLinkUpdated
    ) {
      req.user.customLink = userCustomLinkUpdated;
    }
    // save if all went good
    req.user.save();

    res.json({
      success: true,
      message: `${req.user.username} Profile udpated successfully !`,
    });
  } catch (error) {
    return next(
      new CustomError(500, "Failed to updateProfile, " + error.message)
    );
  }
};

const UserController = {
  registerUser,
  loginUser,
  getCurrentUserInfo,
  handshakeHello,
  getAllTheUsersExceptCurrentOne,
  followUser,
  unFollowUser,
  getSpecificUserInfo,
  updateProfile,
};
export default UserController;
