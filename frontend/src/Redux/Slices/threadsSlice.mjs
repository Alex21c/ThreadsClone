import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import API_ENDPOINTS from "../../config.mjs";

export const fetchThreadsCreatedByCurrentUser = createAsyncThunk('threads/fetchThreadsCreatedByCurrentUser', async (auth) => {
  try {
    // safeguard
    if(!auth.authorization){
      return null;
    }


    console.log('redux Thunk is fetching threds created by current user !'); // keep it
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

export const fetchSpecificUserThreads = createAsyncThunk('threads/fetchSpecificUserThreads', async ({auth, username}) => {
  try {
    // safeguard
    if(!auth.authorization){
      return null;
    }


    console.log('redux Thunk is fetching threds created by current user !'); // keep it
    const headers = {          
      "Authorization": auth.authorization
    };
    
    const requestOptions = {
      method: "GET",
      headers: headers
    };
    

    const reqURL = `${process.env.REACT_APP_SERVER_BASE_URL}${API_ENDPOINTS.Thread['get-all-the-threads-created-by-specific-user']}/${username}`;    
    
    let response = await fetch(reqURL, requestOptions);   
    if(!response){
      throw new Error("No response!");
    }    

    if(response?.statusText === "Unauthorized"){
      // just delete the authorization from local storage
      localStorage.removeItem(process.env.REACT_APP_PREFIX_LOCALSTORAGE +"Authorization");
      
      throw new Error ("Kindly login again");
    }
    response = await response.json();
    if(!response.success){
      // redirect user to the 404 page        
      throw new Error(response.message);
    }


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

export const fetchSpecificThread = createAsyncThunk('threads/fetchSpecificThread', async ({threadID, auth, navigate}) => {
    try {
    // safeguard
    if(!auth.authorization){
      return null;
    }


    console.log('redux Thunk is fetching specific Thread Data !'); // keep it
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
      // that means user has provided with wrong threadID
      // redirect to not found page 
      navigate(`/profile`);
    }
    // console.log(response.data);
    // console.log(response);
    return response.data
  } catch (error) {
    console.error('ThreadsCloneCustomError: failed to make fetch threads for homepage  redux thunk ' + error.message)
    return [];
  }
});



const threadsCreatedByCurrentUserFetchedFromLocalStorage = localStorage.getItem(process.env.REACT_APP_PREFIX_LOCALSTORAGE +"threadsCreatedByCurrentUser");
const homepageThreadsFromLocalStorage = localStorage.getItem(process.env.REACT_APP_PREFIX_LOCALSTORAGE +"homepageThreads");

export const threadsSlice = createSlice({
  name: "threads", 
  initialState: {    
    threadsCreatedByCurrentUser: threadsCreatedByCurrentUserFetchedFromLocalStorage ? JSON.parse(threadsCreatedByCurrentUserFetchedFromLocalStorage) : [],

    specificUserThreads: [], 
    homepageThreads: homepageThreadsFromLocalStorage ? JSON.parse(homepageThreadsFromLocalStorage) : [],
    specificThread: {}
  }, 
  reducers : {
    setThreadsCreatedByCurrentUser: (state, action)=>{      
      localStorage.setItem(process.env.REACT_APP_PREFIX_LOCALSTORAGE+"threadsCreatedByCurrentUser", JSON.stringify(action.payload || []));      
      state.threadsCreatedByCurrentUser = action.payload || [];
    },
    clearThreadsData: (state, action)=>{
      localStorage.removeItem(process.env.REACT_APP_PREFIX_LOCALSTORAGE+"threadsCreatedByCurrentUser");

      state.threadsCreatedByCurrentUser = []; 
      localStorage.removeItem(process.env.REACT_APP_PREFIX_LOCALSTORAGE+"homepageThreads")
      state.homepageThreads = []; 

      state.specificThread= {};
    }

  },
  extraReducers(builder) {
    builder
      .addCase(fetchThreadsCreatedByCurrentUser.fulfilled, (state, action) => {
        // is there any data 
        
          localStorage.setItem(process.env.REACT_APP_PREFIX_LOCALSTORAGE+"threadsCreatedByCurrentUser", JSON.stringify(action.payload || []));              
  
        state.threadsCreatedByCurrentUser =action.payload || [];
      })
      .addCase(fetchSpecificUserThreads.fulfilled, (state, action) => {
        state.specificUserThreads =action.payload || [];
      })
      .addCase(fetchThreadsForHomepage.fulfilled, (state, action) => {
        // is there any data         
        localStorage.setItem(process.env.REACT_APP_PREFIX_LOCALSTORAGE+"homepageThreads", JSON.stringify(action.payload || []));    
        // console.log(action.payload)          
        state.homepageThreads =action.payload || [];
      })
      .addCase(fetchSpecificThread.fulfilled, (state, action) => {
        // is there any data 
        state.specificThread =action.payload || [];
        // console.log(state.specificThread);
        // console.log(action.payload)
      })

  }  
});
// exporting actions
export const  {threadsCreatedByCurrentUser, clearThreadsData} = threadsSlice.actions;

// exporting reducers
const reducerThreadsSlice = threadsSlice.reducer;
export default reducerThreadsSlice;
