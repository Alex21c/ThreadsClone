import mongoose from "mongoose";

const ThreadSchema = new mongoose.Schema({
  bodyText: {type: String, required: false, default : ""},
  bodyImage: { type: Map, of: String, required: true },
  createdBy : {type: mongoose.Types.ObjectId, ref:'users', required: true},
  likes: [{type:mongoose.Types.ObjectId, ref: 'users'}],
  replies: [{type:mongoose.Types.ObjectId, ref:'threads'}],
  replyBelongsToThisThreadID: {type: mongoose.Types.ObjectId, ref: 'threads', default: null}
  
}, {timestamps: true});

const ThreadModel = mongoose.model('threads', ThreadSchema);
export default ThreadModel;