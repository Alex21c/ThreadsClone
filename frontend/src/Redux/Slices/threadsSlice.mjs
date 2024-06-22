import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import API_ENDPOINTS from "../../config.mjs";

export const fetchThreadsCreatedByCurrentUser = createAsyncThunk('threads/fetchThreadsCreatedByCurrentUser', async (auth) => {
  try {
    // safeguard
    if(!auth.authorization){
      return null;
    }


    console.log('redux Thunk is fetching threds !'); // keep it
    const headers = {          
      "Authorization": auth.authorization
    };
    
    const requestOptions = {
      method: "GET",
      headers: headers
    };
    

    const reqURL = `${process.env.REACT_APP_SERVER_BASE_URL}${API_ENDPOINTS.Thread['get-all-the-threads-created-by-current-user']}`;    
    
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

export const fetchThreadsForHomepage = createAsyncThunk('threads/fetchThreadsForHomepage', async (auth) => {
  try {
    // safeguard
    if(!auth.authorization){
      return null;
    }


    console.log('redux Thunk is fetching threads for homepage !'); // keep it
    const headers = {          
      "Authorization": auth.authorization
    };
    
    const requestOptions = {
      method: "GET",
      headers: headers
    };
    
    const reqURL = `${process.env.REACT_APP_SERVER_BASE_URL}${API_ENDPOINTS.Thread['get-homepage-threads-for-current-user']}`;    
    
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
    console.error('ThreadsCloneCustomError: failed to make fetch threads for homepage  redux thunk ' + error.message)
  }
});



const threadsCreatedByCurrentUserFetchedFromLocalStorage = localStorage.getItem(process.env.REACT_APP_PREFIX_LOCALSTORAGE +"threadsCreatedByCurrentUser");
const homepageThreadsFromLocalStorage = localStorage.getItem(process.env.REACT_APP_PREFIX_LOCALSTORAGE +"homepageThreads");

export const threadsSlice = createSlice({
  name: "threads", 
  initialState: {    
    threadsCreatedByCurrentUser: threadsCreatedByCurrentUserFetchedFromLocalStorage ? JSON.parse(threadsCreatedByCurrentUserFetchedFromLocalStorage) : [],
    homepageThreads: homepageThreadsFromLocalStorage ? JSON.parse(homepageThreadsFromLocalStorage) : []
  }, 
  reducers : {
    setThreadsCreatedByCurrentUser: (state, action)=>{      
      localStorage.setItem(process.env.REACT_APP_PREFIX_LOCALSTORAGE+"threadsCreatedByCurrentUser", action.payload || []);      
      state.threadsCreatedByCurrentUser = action.payload || [];
    },

  },
  extraReducers(builder) {
    builder
      .addCase(fetchThreadsCreatedByCurrentUser.fulfilled, (state, action) => {
        // is there any data 
        if(action.payload){
          localStorage.setItem(process.env.REACT_APP_PREFIX_LOCALSTORAGE+"threadsCreatedByCurrentUser", JSON.stringify(action.payload || []));              
          state.threadsCreatedByCurrentUser =action.payload || [];
        }
      })
      .addCase(fetchThreadsForHomepage.fulfilled, (state, action) => {
        // is there any data 
        if(action.payload){
          localStorage.setItem(process.env.REACT_APP_PREFIX_LOCALSTORAGE+"homepageThreads", JSON.stringify(action.payload || []));              
          state.homepageThreads =action.payload || [];
        }
      })

  }  
});
// exporting actions
export const  {threadsCreatedByCurrentUser} = threadsSlice.actions;

// exporting reducers
const reducerThreadsSlice = threadsSlice.reducer;
export default reducerThreadsSlice;
