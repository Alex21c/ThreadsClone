import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth", 
  initialState: {

    authorization: localStorage.getItem(process.env.REACT_APP_PREFIX_LOCALSTORAGE +"Authorization") || null
  }, 
  reducers : {
    setJwt: (state, action)=>{      
      localStorage.setItem(process.env.REACT_APP_PREFIX_LOCALSTORAGE+"Authorization", action.payload);      
      state.authorization = action.payload;
    },
    removeJwt: (state)=>{
      localStorage.removeItem(process.env.REACT_APP_PREFIX_LOCALSTORAGE+"Authorization")
    }

  }
});
// exporting actions
export const  {setJwt, removeJwt} = authSlice.actions;

// exporting reducers
const reducerAuthSlice = authSlice.reducer;
export default reducerAuthSlice;
