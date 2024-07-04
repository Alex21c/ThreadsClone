import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import API_ENDPOINTS from "../../config.mjs";

export const fetchUser = createAsyncThunk('user/fetchUser', async (auth) => {
  // safeguard
    if(!auth.authorization){
      return null;
    }

  try {    
    console.log('redux Thunk is fetching user data !'); // keep it
    const headers = {          
      "Authorization": auth.authorization
    };
    
    const requestOptions = {
      method: "GET",
      headers: headers
    };
    
    const reqURL = `${process.env.REACT_APP_SERVER_BASE_URL}${API_ENDPOINTS.User['get-current-user-info']}`;    
  
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
})

export const fetchSpecificUserInfo = createAsyncThunk('user/fetchSpecificUserInfo', async ({auth, username, navigate}) => {
  // safeguard
    if(!auth.authorization){
      return null;
    }

  try {    
    console.log('redux Thunk is fetching specific user data !'); // keep it
    const headers = {          
      "Authorization": auth.authorization
    };
    
    const requestOptions = {
      method: "GET",
      headers: headers
    };
    
    const reqURL = `${process.env.REACT_APP_SERVER_BASE_URL}${API_ENDPOINTS.User['get-specific-user-info']}/${username}`;    
  
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
      navigate(`/404`)
      throw new Error(response.message);
    }
    
    
    // console.log(response);
    return response.data;
  } catch (error) {
    console.error('ThredsCloneCustomError: failed to make fetch req redux thunk ' + error.message)
  }
})


export const fetchAllTheUsersExceptCurrentOne = createAsyncThunk('user/fetchAllTheUsersExceptCurrentOne', async (auth) => {
  // safeguard
    if(!auth.authorization){
      return null;
    }

  try {    
    console.log('redux Thunk is fetching all the users except current user !'); // keep it
    const headers = {          
      "Authorization": auth.authorization
    };
    
    const requestOptions = {
      method: "GET",
      headers: headers
    };
    
    const reqURL = `${process.env.REACT_APP_SERVER_BASE_URL}${API_ENDPOINTS.User['get-all-the-users-except-current-one']}`;    
  
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
})

const userDataFromLocalStorage = localStorage.getItem(process.env.REACT_APP_PREFIX_LOCALSTORAGE +"userData");

export const userSlice = createSlice({
  name: "user", 
  initialState: {    
    data: userDataFromLocalStorage ? JSON.parse(userDataFromLocalStorage) : {},
    specificUserInfo: {},
    allTheUsersExceptCurrentOne: []
    
  }, 
  reducers : {
    setUserData: (state, action)=>{      
      localStorage.setItem(
        process.env.REACT_APP_PREFIX_LOCALSTORAGE+"userData", JSON.stringify(action.payload || {}));        
      state.data = action.payload || {};
    },
    clearUserData: (state)=>{      
      localStorage.removeItem(
        process.env.REACT_APP_PREFIX_LOCALSTORAGE+"userData");        
      state.data = {};
    },
    

  },
  extraReducers(builder) {
    builder
      .addCase(fetchUser.fulfilled, (state, action) => {        
        // is there any data ?
        if(action.payload){
          localStorage.setItem(
            process.env.REACT_APP_PREFIX_LOCALSTORAGE+"userData",JSON.stringify(action.payload || {})
          );              
          state.data = action.payload || {}
        }
      })
      .addCase(fetchAllTheUsersExceptCurrentOne.fulfilled, (state, action) => {                 
          state.allTheUsersExceptCurrentOne = action.payload || [];
          // console.log(action.payload)
        
      })
      .addCase(fetchSpecificUserInfo.fulfilled, (state, action) => {                 
          state.specificUserInfo = action.payload || {};
          // console.log(action.payload)        
      })

  }  
});
// exporting actions
export const  {setUserData, clearUserData} = userSlice.actions;

// exporting reducers
const reducerUserSlice = userSlice.reducer;
export default reducerUserSlice;
