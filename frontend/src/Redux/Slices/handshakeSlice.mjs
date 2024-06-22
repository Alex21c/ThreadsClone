import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import API_ENDPOINTS from "../../config.mjs";

export const handshakeHello = createAsyncThunk('user/handshakeHello', async () => {
  function isTimeStamp10MinutesOlder(previousTimeStamp){    
    previousTimeStamp = new Date(previousTimeStamp)
    let currentTimestamp = new Date();
    let tenMinues = 10*60*1000;    
    let difference = currentTimestamp- previousTimeStamp;
    // console.log(difference)
    if(difference > tenMinues){
      return true;
    }else{
      return false;
    }
  
  }

  // check the local storage for handshake data
  // do not make the req if last handshake was performed 10 minutes earlier
  try {
    const dataFromLocalStorage = localStorage.getItem(process.env.REACT_APP_PREFIX_LOCALSTORAGE +"handshakeData");
    if(dataFromLocalStorage){
      const {timestamp} = JSON.parse(dataFromLocalStorage);

      if(timestamp && !isTimeStamp10MinutesOlder(timestamp)){
        console.log('no need to perform handshake !');
       return null;
     }
    }
  } catch (error) {
    console.error(process.env.REACT_APP_PREFIX_LOCALSTORAGE+"CustomError: " + error.message);    
  }

  
  
 
  try {    
    console.log('redux Thunk is making handshake with render server !'); // keep it

    const requestOptions = {
      method: "GET"
     };
    
    const reqURL = `${process.env.REACT_APP_SERVER_BASE_URL}${API_ENDPOINTS.User.handshake}`;    
  
    let response = await fetch(reqURL, requestOptions);    
    if(response){
      response = await response.json();
    }
    if(response?.success){
      // then update localstorage with handshake info
      const handshakeInfo= {
        success: response.success,
        timestamp: Date.now() //converting date into timestamp number
      };
      return handshakeInfo;

    }else{
      throw new Error("not successfull !");
    }

  } catch (error) {
    console.error('ThreadsCloneCustomError: failed to make fetch req redux thunk ' + error.message)
  }
})

const handshakeDataFromLocalStorage = localStorage.getItem(process.env.REACT_APP_PREFIX_LOCALSTORAGE +"handshakeData");

export const handshakeSlice = createSlice({
  name: "handshake", 
  initialState: {    
    data: handshakeDataFromLocalStorage ? JSON.parse(handshakeDataFromLocalStorage) : {}
  }, 
  reducers : {

    setHandshakeData: (state, action)=>{      
      localStorage.setItem(
        process.env.REACT_APP_PREFIX_LOCALSTORAGE+"handshakeData", JSON.stringify(action.payload || {})
      );        
      state.data = action.payload || {};
    },
    clearHandshakeData: (state)=>{      
      localStorage.removeItem(
        process.env.REACT_APP_PREFIX_LOCALSTORAGE+"handshakeData");        
      state.data = {};
    },

  },
  extraReducers(builder) {
    builder
      .addCase(handshakeHello.pending, (state, action) => {
        // state.status = 'loading'
      })
      .addCase(handshakeHello.fulfilled, (state, action) => {
        // state.status = 'succeeded'
        // Add any fetched posts to the array
        // is there any data ?
        if(action.payload){
          localStorage.setItem(
            process.env.REACT_APP_PREFIX_LOCALSTORAGE+"handshakeData", JSON.stringify(action.payload ||  {})
          );              
          state.data = action.payload || {}
        }
      })
      .addCase(handshakeHello.rejected, (state, action) => {
        // state.status = 'failed'
        // state.error = action.error.message
      })
  }  
});
// exporting actions
export const  {setHandshakeData, clearHandshakeData} = handshakeSlice.actions;

// exporting reducers
const reducerHandshakeSlice = handshakeSlice.reducer;
export default reducerHandshakeSlice;
