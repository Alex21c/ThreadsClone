import ThreadModel from "../Models/ThreadModel.mjs";
import UserModel from "../Models/UserModel.mjs";
import CustomError from "../Utils/CustomError.mjs";
import mongoose from "mongoose";
import CloudinaryHelper from "../Utils/CloudinaryHelper.mjs";
import fs from "fs";

const createNewThread = async (req, res, next) => {
  try {
    const { bodyText } = req.body;
    const bodyImage = req?.file;

    // console.log(req.body);
    // first check if both text or image are empty
    if (!bodyText && !bodyImage) {
      return next(
        new CustomError(
          200,
          "Cannot create empty thread, make sure you provide either image or text as body!"
        )
      );
    }

    // append userID
    req.body.createdBy = req.user._id;

    // Create a new document
    const doc = new ThreadModel(req.body);
    // upload image file to clodinary
    // console.log(bodyImage);
    if (bodyImage) {
      try {
        const objCloudinary = new CloudinaryHelper();
        const response = await objCloudinary.uploadFile(
          bodyImage,
          `${process.env.PRJ_NAME || "ThreadsClone"}/${
            req.user.username
          }-threads/${doc._id}`
        );
        if (!response) {
          throw new Error("failed to upload file");
        }

        const imgData = {
          public_id: response.public_id,
          url: response.secure_url,
        };
        doc.bodyImage = imgData;
      } catch (error) {
        return next(
          new CustomError(
            500,
            "Failed to upload image file to server ! " + error.message
          )
        );
      } finally {
        // delete file from uploads dir
        setTimeout(() => {
          fs.unlinkSync(req.file.path);
        }, 2000);
      }
    }

    await doc.save();

    // response back
    res.status(201).json({
      success: true,
      message: "Thread Created Successfully !",
      threadID: doc._id,
    });
  } catch (error) {
    return next(
      new CustomError(500, "Cannot create a thread, ERROR: " + error.message)
    );
  }
};

const getHomepageThreadsForCurrentUser = async (req, res, next) => {
  try {
    let query = [];

    // first check does current user follows anyone?
    // if user doesn't follow anyone then let user see threads from alex21c
    // default id for alex21c is 66781930292326504172713b in mongodb atlas
    // if(req?.user?.following?.length === 0){
    //   query.push({ createdBy: "667936c01a89c30b67dda396", replyBelongsToThreadCreatedByThisUser: null });
    // }

    req.user.following.forEach((user) => {
      query.push({
        createdBy: user._id,
        replyBelongsToThreadCreatedByThisUser: null,
      });
    });

    // safeguard
    if (req.user.following.length === 0) {
      return next(new CustomError(400, "User following no one !"));
    }

    // just get threads created by other users who our current user is following
    const threadsCreatedByAlex21C = await ThreadModel.find({
      $or: query,
    })
      .populate({
        path: "replies",
        populate: {
          path: "createdBy",
          select: "username profileImage",
        },
      })
      .populate("createdBy", "username profileImage")
      .sort({ createdAt: -1 });

    // if no thread are there just send success false
    if (threadsCreatedByAlex21C.length === 0) {
      return res.json({
        success: false,
        message: `hello ${req.user.username}, Alex21C hasn't created any thread yet!`,
      });
    }
    // send the threads back
    res.json({
      success: true,
      data: threadsCreatedByAlex21C,
    });
  } catch (error) {
    return next(
      new CustomError(
        500,
        "failed to fetch homepage threads for current user, ERROR: " +
          error.message
      )
    );
  }
};

const getAllTheThreadsCreatedBySpecificUser = async (req, res, next) => {
  try {
    // does there is any username ?
    const { username } = req.params;
    if (!username) {
      return next(new CustomError(400, "Missing username inside params !"));
    }

    // just find the db if there is any user matching ?
    const specificUser = await UserModel.findOne({ username });

    if (!specificUser) {
      return next(new CustomError(500, "User not found !"));
    }
    // update req.user
    req.user = specificUser;

    // query the database and ask for all the threads created by current user
    // const threadsCreatedByCurrentUser = await ThreadModel.find({createdBy: req.user._id}).populate('replies').populate('createdBy', 'username profileImage').sort({createdAt: -1});
    const threadsCreatedByCurrentUser = await ThreadModel.find({
      createdBy: req.user._id,
      replyBelongsToThreadCreatedByThisUser: null,
    })
      .populate({
        path: "replies",
        populate: {
          path: "createdBy",
          select: "username profileImage",
        },
      })
      .populate("createdBy", "username profileImage")
      .sort({ createdAt: -1 });
    // console.log(threadsCreatedByCurrentUser);
    // if no thread are there just send success false
    if (threadsCreatedByCurrentUser.length === 0) {
      return res.json({
        success: false,
        message: `hello ${req.user.username}, You havn't created any thread yet!`,
      });
    }
    // send the threads back
    res.json({
      success: true,
      data: threadsCreatedByCurrentUser,
    });
  } catch (error) {
    return next(
      new CustomError(
        500,
        "failed to fetch all the threads, ERROR: " + error.message
      )
    );
  }
};
const getAllTheThreadsCreatedByCurrentUser = async (req, res, next) => {
  try {
    // query the database and ask for all the threads created by current user
    // const threadsCreatedByCurrentUser = await ThreadModel.find({createdBy: req.user._id}).populate('replies').populate('createdBy', 'username profileImage').sort({createdAt: -1});
    const threadsCreatedByCurrentUser = await ThreadModel.find({
      createdBy: req.user._id,
      replyBelongsToThreadCreatedByThisUser: null,
    })
      .populate({
        path: "replies",
        populate: {
          path: "createdBy",
          select: "username profileImage",
        },
      })
      .populate("createdBy", "username profileImage")
      .sort({ createdAt: -1 });
    // console.log(threadsCreatedByCurrentUser);
    // if no thread are there just send success false
    if (threadsCreatedByCurrentUser.length === 0) {
      return res.json({
        success: false,
        message: `hello ${req.user.username}, You havn't created any thread yet!`,
      });
    }
    // send the threads back
    res.json({
      success: true,
      data: threadsCreatedByCurrentUser,
    });
  } catch (error) {
    return next(
      new CustomError(
        500,
        "failed to fetch all the threads, ERROR: " + error.message
      )
    );
  }
};

const getSpecificThread = async (req, res, next) => {
  try {
    const populatedThread = await ThreadModel.findById(req.thread._id)
      .populate({
        path: "replies",
        populate: {
          path: "createdBy",
          select: "username profileImage",
        },
      })
      .populate("createdBy", "username profileImage")
      .sort({ createdAt: -1 });

    // if no thread are there just send success false
    if (!populatedThread) {
      return res.json({
        success: false,
        message: `thread not found !`,
      });
    }
    // send the threads back
    res.json({
      success: true,
      data: populatedThread,
    });
  } catch (error) {
    return next(
      new CustomError(
        500,
        "failed to fetch specific thread, ERROR: " + error.message
      )
    );
  }
};

const likeAThread = async (req, res, next) => {
  try {
    // then push the current user id to the likes
    req.thread.likes.addToSet(req.user._id);
    req.thread.save();

    // now push the thread ID into the users likedThreads array as well
    req.user.likedThreads.addToSet(req.thread._id);
    req.user.save();

    // response success !

    // response
    res.json({
      success: true,
      message: "Liked Successfully !",
      totalLikes: req.thread.likes.length,
    });
  } catch (error) {
    return next(
      new CustomError(500, "Cannot like a thread, ERROR:" + error.message)
    );
  }
};

const unlikeAThread = async (req, res, next) => {
  try {
    // then pull the current user id to the likes
    req.thread.likes.pull(req.user._id);
    req.thread.save();

    // now push the thread ID into the users likedThreads array as well
    req.user.likedThreads.pull(req.thread._id);
    req.user.save();

    // response success !

    // response
    res.json({
      success: true,
      message: "Un-Liked Successfully !",
      totalLikes: req.thread.likes.length,
    });
  } catch (error) {
    return next(
      new CustomError(500, "Cannot unlike a thread, ERROR:" + error.message)
    );
  }
};

const deleteAThread = async (req, res, next) => {
  try {
    // check if this thread is created by current user?
    if (req.thread.createdBy.toString() !== req.user._id.toString()) {
      return next(
        new CustomError(
          400,
          "Not allowed, this thread doesn't belogs to You, it was created by other user!"
        )
      );
    }

    // check if there is an body image then delete it from cloudinary
    const public_id = req.thread.bodyImage.get("public_id");
    try {
      if (public_id) {
        const objCloudinary = new CloudinaryHelper();
        await objCloudinary.deleteFile(public_id);
        // delete dir as well containing the image
        const parts = public_id.split("/");
        parts.pop();
        const folderID = parts.join("/");
        await objCloudinary.deleteFolder(folderID);
      }
    } catch (error) {
      console.log(error.message);
    }

    // remove the doc
    await req.thread.deleteOne();

    // response success !
    res.json({
      success: true,
      message: "Thread Deleted Successfully !",
    });
  } catch (error) {
    console.log(error);
    return next(
      new CustomError(500, "Cannot delete a thread, ERROR:" + error.message)
    );
  }
};

const ThreadController = {
  createNewThread,
  likeAThread,
  unlikeAThread,
  deleteAThread,
  getAllTheThreadsCreatedByCurrentUser,
  getHomepageThreadsForCurrentUser,
  getSpecificThread,
  getAllTheThreadsCreatedBySpecificUser,
};
export default ThreadController;
