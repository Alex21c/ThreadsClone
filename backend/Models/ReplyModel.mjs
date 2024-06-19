import mongoose from "mongoose";

const ReplySchema = new mongoose.Schema({
  text: {type: String, required: true},
  createdBy : {type: mongoose.Types.ObjectId, ref:'users', required: true},
  likes: [{type:mongoose.Types.ObjectId, ref: 'users'}],
  replies: [{type:mongoose.Types.ObjectId, ref: 'replies'}],
    
}, {timestamps: true});

const ReplyModel = mongoose.model('replies', ReplySchema);
export default ReplyModel;