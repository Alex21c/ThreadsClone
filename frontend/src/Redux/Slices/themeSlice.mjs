import { createSlice } from "@reduxjs/toolkit";
const darkTheme = {
  primaryText: "#f3f5f7",
  secondaryText: "#777777",
  brightText: "white",
  background: "#101010",
  backgroundHover: "#ffffff0d",
  currentThemeIs: "dark",
  borderColor: "#f3f5f726",
};
const lightTheme = {
  primaryText: "#000000",
  secondaryText: "#999999",
  brightText: "white",
  background: "#fafafa",
  backgroundHover: "#ffffff",
  currentThemeIs: "light",
  borderColor: "#00000026",
};
const themeDataFromLocalStorage = localStorage.getItem(
  process.env.REACT_APP_PREFIX_LOCALSTORAGE + "themeData"
);

export const themeSlice = createSlice({
  name: "theme",
  initialState: themeDataFromLocalStorage
    ? JSON.parse(themeDataFromLocalStorage)
    : darkTheme,
  reducers: {
    setDarkTheme: (state) => {
      localStorage.setItem(
        process.env.REACT_APP_PREFIX_LOCALSTORAGE + "themeData",
        JSON.stringify(darkTheme || {})
      );
      state = darkTheme;
      return darkTheme; // returning so that react being aware of the change
    },
    setLightTheme: (state) => {
      localStorage.setItem(
        process.env.REACT_APP_PREFIX_LOCALSTORAGE + "themeData",
        JSON.stringify(lightTheme || {})
      );
      state = lightTheme;
      return lightTheme; // returning so that react being aware of the change
    },
  },
});

export const { setDarkTheme, setLightTheme } = themeSlice.actions;
const themeReducer = themeSlice.reducer;
export default themeReducer;
