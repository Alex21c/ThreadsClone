import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  firstName: {type:String, required: true},
  lastName: {type:String, required: false, default: ""},
  email: {type: String, required: true},
  mobile: {type: String, required: true},
  username: {type: String, required: true},
  password: {type: String, required: true},
  bio: {type: String, required: false, default : ""},
  profileImage: { type: Map, of: String },  
  customLink : {type: String, required: false, default: ""},
  followers : [{type: mongoose.Types.ObjectId, ref: "users"}],
  following : [{type: mongoose.Types.ObjectId, ref: "users"}],
  likedThreads: [{type:mongoose.Types.ObjectId, ref: "threads"}]
  
}, {timestamps: true});

const UserModel = mongoose.model('users', UserSchema);
export default UserModel;