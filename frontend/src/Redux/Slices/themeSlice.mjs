import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  primaryText: "#f3f5f7",
  secondaryText: "#777777",
  brightText: "white",
  background : "#101010",
  backgroundHover: "#ffffff0d",
  currentThemeIs : "dark",
  borderColor: "#f3f5f726"
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState, 
  reducers: {
    darkTheme : (state)=>{
        state.primaryText= "#f3f5f7";
        state.secondaryText= "#777777";
        state.background = "#101010";
        state.currentThemeIs="dark";
      },
      lightTheme: (state)=>{
        state.primaryText= "#f3f5f7";
        state.secondaryText= "#101010";
        state.background = "#777777";
        state.currentThemeIs="light";
    }
  }
});

export const {darkTheme, lightTheme} = themeSlice.actions;
const themeReducer = themeSlice.reducer;
export default themeReducer;
