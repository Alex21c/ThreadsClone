import ThreadModel from "../Models/ThreadModel.mjs";
import UserModel from "../Models/UserModel.mjs";
import CustomError from "../Utils/CustomError.mjs";

const getAllUsersOrThreadsMatchingSearchQuery = async (req, res, next)=>{
  try {
  // is there query provided?
   const {query} = req.params;
   if(!query){
    throw new Error("missing query in the request body !");
   }
       
  // search all the threads matching query
    const threads=await ThreadModel.find({bodyText: new RegExp(query, 'i')})
                                    .populate('createdBy', 'username profileImage')
                                    .sort({ createdAt: -1 });

  // search all the users matching query except current user
    const users= await UserModel.find({
      $or: [
      {firstName: new RegExp(query, 'i')},
      {lastName: new RegExp(query, 'i')},
      {username: new RegExp(query, 'i')}      
    ],
    _id:{ $ne: req.user._id}    
  });


   if(threads.length ===0 && users.length === 0){
    return res.json({
      success: false, 
      message: "No records found !"
    })
   } 
   
   res.json({
    success: true,
    data : {
      users, threads
    }
   })
  } catch (error) {    
    return next(new CustomError(500, "Failed to getAllUsersOrThreadsMatchingSearchQuery, ERROR: " + error.message));
  }

};


const SearchController = {getAllUsersOrThreadsMatchingSearchQuery};
export default SearchController;
