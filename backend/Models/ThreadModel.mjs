import mongoose from "mongoose";

const ThreadSchema = new mongoose.Schema({
  bodyText: {type: String, required: false, default : ""},
  bodyImage: { type: Map, of: String },
  createdBy : {type: mongoose.Types.ObjectId, ref:'users', required: true},
  likes: [{type:mongoose.Types.ObjectId, ref: 'users'}],
  replies: [{type:mongoose.Types.ObjectId, ref:'threads'}],
  replyBelongsToThisThreadID: {type: mongoose.Types.ObjectId, ref: 'threads', default: null},
  replyBelongsToThreadCreatedByThisUser: {type: mongoose.Types.ObjectId, ref: 'users', default: null}
  
}, {timestamps: true});

ThreadSchema.pre('deleteOne', { document: true, query: false }, async function (next) {
  try {
    // Find all replies to this thread
    const replies = await ThreadModel.find({ replyBelongsToThisThreadID: this._id });

    // Recursively delete all replies
    for (let reply of replies) {      
      await reply.deleteOne();
    }

    next();
  } catch (error) {
    next(error);
  }
});


const ThreadModel = mongoose.model('threads', ThreadSchema);
export default ThreadModel;