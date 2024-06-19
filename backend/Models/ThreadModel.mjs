import mongoose from "mongoose";

const ThreadSchema = new mongoose.Schema({
  bodyText: {type: String, required: false, default : ""},
  bodyImage: {type: String, required: false, default: ""},
  createdBy : {type: mongoose.Types.ObjectId, ref:'users', required: true},
  likes: [{type:mongoose.Types.ObjectId, ref: 'users'}],
  replies: [{type:mongoose.Types.ObjectId, ref:'replies'}]
  
}, {timestamps: true});

const ThreadModel = mongoose.model('threads', ThreadSchema);
export default ThreadModel;