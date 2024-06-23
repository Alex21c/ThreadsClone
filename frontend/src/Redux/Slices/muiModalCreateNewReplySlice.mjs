import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import API_ENDPOINTS from "../../config.mjs";


const initialState = {
  open: false,
  replyingToThisThread: {}
};

export const fetchReplyingToThisThread = createAsyncThunk('threads/fetchReplyingToThisThread', async ({threadID, auth}) => {
  
  try {
  // safeguard
  if(!auth.authorization){
    return null;
  }


  console.log('redux Thunk is fetching specific Thread Data user is replying to !'); // keep it
  const headers = {          
    "Authorization": auth.authorization
  };
  
  const requestOptions = {
    method: "GET",
    headers: headers
  };
  

  const reqURL = `${process.env.REACT_APP_SERVER_BASE_URL}${API_ENDPOINTS.Thread['get-specific-thread']}/${threadID}`
  
  let response = await fetch(reqURL, requestOptions); 
  
  if(response?.statusText === "Unauthorized"){
    // just delete the authorization from local storage
    localStorage.removeItem(process.env.REACT_APP_PREFIX_LOCALSTORAGE +"Authorization");
    throw new Error ("Kindly login again");
  }
  response = await response.json();
  if(!response.success){
    throw new Error(response.message)
  }
  // console.log(response.data);
  // console.log(response);
  return response.data
} catch (error) {
  console.error('ThreadsCloneCustomError: failed to make fetch threads for muiModalCreateNewReply  redux thunk ' + error.message)
  return [];
}
});

export const muiModalCreateNewReplySlice = createSlice({
  name: 'muiModalCreateNewReply',
  initialState,
  reducers: {
    openMuiModalCreateNewReply: (state)=>{
      state.open= true
    },
    closeMuiModalCreateNewReply: (state)=>{
      state.open= false
    }
  },
  extraReducers(builder) {
    builder.addCase(fetchReplyingToThisThread.fulfilled, (state, action) => {
        // is there any data 
        state.replyingToThisThread =action.payload || [];
        
        // console.log(action.payload)
      })

  }  
});

export const {openMuiModalCreateNewReply, closeMuiModalCreateNewReply} = muiModalCreateNewReplySlice.actions;
const muiModalCreateNewReplySliceReducer = muiModalCreateNewReplySlice.reducer;
export default muiModalCreateNewReplySliceReducer;





