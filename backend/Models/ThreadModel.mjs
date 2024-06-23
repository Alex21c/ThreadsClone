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

const ThreadModel = mongoose.model('threads', ThreadSchema);
export default ThreadModel;