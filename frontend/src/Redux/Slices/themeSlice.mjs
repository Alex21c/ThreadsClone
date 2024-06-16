import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  primaryText: "#f3f5f7",
  secondaryText: "#777777",
  background : "#101010"
  
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState, 
  reducers: {
    darkTheme : (state)=>{
        state.primaryText= "#f3f5f7";
        state.secondaryText= "#777777";
        state.background = "#101010";
      },
      lightTheme: (state)=>{
        state.primaryText= "#f3f5f7";
        state.secondaryText= "#101010";
        state.background = "#777777";
    }
  }
});

export const {darkTheme, lightTheme} = themeSlice.actions;
const themeReducer = themeSlice.reducer;
export default themeReducer;
