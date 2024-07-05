import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import API_ENDPOINTS from "../../config.mjs";

export const fetchRepliesMadeByCurrentUser = createAsyncThunk('replies/fetchRepliesMadeByCurrentUser', async (auth) => {
  try {
    // safeguard
    if(!auth.authorization){
      return null;
    }


    console.log('redux Thunk is fetching repiles made by current user !'); // keep it
    const headers = {          
      "Authorization": auth.authorization
    };
    
    const requestOptions = {
      method: "GET",
      headers: headers
    };
    

    const reqURL = `${process.env.REACT_APP_SERVER_BASE_URL}${API_ENDPOINTS.Reply['get-all-the-replies-made-by-current-user']}`;    
    
    let response = await fetch(reqURL, requestOptions);   
    
    if(response?.statusText === "Unauthorized"){
      // just delete the authorization from local storage
      localStorage.removeItem(process.env.REACT_APP_PREFIX_LOCALSTORAGE +"Authorization");
      
      throw new Error ("Kindly login again");
    }
    response = await response.json();
    // console.log(response);
    return response.data
  } catch (error) {
    console.error('ThredsCloneCustomError: failed to make fetch req redux thunk ' + error.message)
  }
});

export const fetchSpecificUserReplies = createAsyncThunk('replies/fetchSpecificUserReplies', async ({auth, username}) => {
  try {    
    // safeguard
    if(!auth.authorization){
      return null;
    }


    console.log('redux Thunk is fetching repiles made by specific user !'); // keep it
    const headers = {          
      "Authorization": auth.authorization
    };
    
    const requestOptions = {
      method: "GET",
      headers: headers
    };
    

    const reqURL = `${process.env.REACT_APP_SERVER_BASE_URL}${API_ENDPOINTS.Reply['get-all-the-replies-made-by-specific-user']}/${username}`;     
    
    let response = await fetch(reqURL, requestOptions);   
    if(!response){
      throw new Error("No response!");
    }    
    response = await response.json();

    if(response?.statusText === "Unauthorized"){
      // just delete the authorization from local storage
      localStorage.removeItem(process.env.REACT_APP_PREFIX_LOCALSTORAGE +"Authorization");
      
      throw new Error ("Kindly login again");
    }
    
    
    if(!response.success){
      // redirect user to the 404 page        
      throw new Error(response.message);
    }

    // console.log(response);
    return response.data
  } catch (error) {
    console.info('ThredsCloneCustomError: failed to make fetch req redux thunk ' + error.message)
  }
});




const repliesMadeByCurrentUserFetchedFromLocalStorage = localStorage.getItem(process.env.REACT_APP_PREFIX_LOCALSTORAGE +"repliedMadeByCurrentUser");

export const replySlice = createSlice({
  name: "replies", 
  initialState: {    
    specificUserReplies: [],
    repliesMadeByCurrentUser: repliesMadeByCurrentUserFetchedFromLocalStorage ? JSON.parse(repliesMadeByCurrentUserFetchedFromLocalStorage) : [],

  }, 
  reducers : {
    setRepliesMadeByCurrentUser: (state, action)=>{      
      localStorage.setItem(process.env.REACT_APP_PREFIX_LOCALSTORAGE+"repliedMadeByCurrentUser", JSON.stringify(action.payload || []));      
      state.repliesMadeByCurrentUser = action.payload || [];
    },
    clearRepliesData: (state, action)=>{
      localStorage.removeItem(process.env.REACT_APP_PREFIX_LOCALSTORAGE+"repliedMadeByCurrentUser");
      state.repliesMadeByCurrentUser = []; 
    }

  },
  extraReducers(builder) {
    builder
      .addCase(fetchRepliesMadeByCurrentUser.fulfilled, (state, action) => {
        // is there any data         
          localStorage.setItem(process.env.REACT_APP_PREFIX_LOCALSTORAGE+"repliedMadeByCurrentUser", JSON.stringify(action.payload || []));              
        state.repliesMadeByCurrentUser =action.payload || [];
      })
      .addCase(fetchSpecificUserReplies.fulfilled, (state, action) => {            
        state.specificUserReplies =action.payload || [];
      })

  }  
});
// exporting actions
export const  {setRepliesMadeByCurrentUser, clearRepliesData} = replySlice.actions;

// exporting reducers
const reducerReplySlice = replySlice.reducer;
export default reducerReplySlice;
