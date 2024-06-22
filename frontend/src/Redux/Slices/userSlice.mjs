import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import API_ENDPOINTS from "../../config.mjs";

export const fetchUser = createAsyncThunk('user/fetchUser', async (auth) => {
  // safeguard
    if(!auth.authorization){
      return;
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

const userDataFromLocalStorage = localStorage.getItem(process.env.REACT_APP_PREFIX_LOCALSTORAGE +"userData");

export const userSlice = createSlice({
  name: "user", 
  initialState: {    
    data: userDataFromLocalStorage ? JSON.parse(userDataFromLocalStorage) : {}
  }, 
  reducers : {
    setUserData: (state, action)=>{      
      localStorage.setItem(
        process.env.REACT_APP_PREFIX_LOCALSTORAGE+"userData",
        action.payload ?  JSON.stringify(action.payload) : {}
      );        
      state.data = action.payload || {};
    },

  },
  extraReducers(builder) {
    builder
      .addCase(fetchUser.pending, (state, action) => {
        // state.status = 'loading'
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        // state.status = 'succeeded'
        // Add any fetched posts to the array

        localStorage.setItem(
          process.env.REACT_APP_PREFIX_LOCALSTORAGE+"userData",
          action.payload ?  JSON.stringify(action.payload) : {}
        );              
        state.data = action.payload || {}
      })
      .addCase(fetchUser.rejected, (state, action) => {
        // state.status = 'failed'
        // state.error = action.error.message
      })
  }  
});
// exporting actions
export const  {setUserData} = userSlice.actions;

// exporting reducers
const reducerUserSlice = userSlice.reducer;
export default reducerUserSlice;
