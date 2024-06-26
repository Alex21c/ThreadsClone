import { createSlice } from "@reduxjs/toolkit";

// for Dark theme
  import logoDark from '../../Assests/Images/Icons/ForDarkTheme/logo.svg';
  import logoHomeDark from '../../Assests/Images/Icons/ForDarkTheme/home.svg';
  import logoHomeDarkActive from '../../Assests/Images/Icons/ForDarkTheme/homeActive.svg';
  import logoSearchDark from '../../Assests/Images/Icons/ForDarkTheme/search.svg';
  import logoSearchDarkActive from '../../Assests/Images/Icons/ForDarkTheme/searchActive.svg';
  import logoHeartDark from '../../Assests/Images/Icons/ForDarkTheme/heart.svg';
  import logoHeartActive from '../../Assests/Images/Icons/ForDarkTheme/heartActive.svg';
  import logoUserDark from '../../Assests/Images/Icons/ForDarkTheme/user.svg';
  import logoPinDarkDarkActive from '../../Assests/Images/Icons/ForDarkTheme/userActive.svg';
  import logoPinDark from '../../Assests/Images/Icons/ForDarkTheme/pin.svg';
  import logoPinDarkActive from '../../Assests/Images/Icons/ForDarkTheme/pinActive.svg';
  import logoDarkCreateAThread from '../../Assests/Images/Icons/ForDarkTheme/createAThread.svg';
  
// for light theme
import logoLight from '../../Assests/Images/Icons/ForLightTheme/logo.svg';
import logoHomeLight from '../../Assests/Images/Icons/ForLightTheme/home.svg';
import logoHomeLightActive from '../../Assests/Images/Icons/ForLightTheme/homeActive.svg';
import logoSearchLight from '../../Assests/Images/Icons/ForLightTheme/search.svg';
import logoHeartLight from '../../Assests/Images/Icons/ForLightTheme/heart.svg';
import logoPinLight from '../../Assests/Images/Icons/ForLightTheme/pin.svg';
import logoPinLightActive from '../../Assests/Images/Icons/ForLightTheme/pinActive.svg';
import logoCreateAThreadLight from "../../Assests/Images/Icons/ForLightTheme/createAThread.svg";


export const iconsSlice = createSlice({
  name: "icons", 
  initialState: {
    "light": {
      'logo': logoLight,
      'home': logoHomeLight,
      'homeActive': logoHomeLightActive,
      'search': logoSearchLight,
      'searchActive': logoSearchLight,
      'heart': logoHeartLight,
      'heartActive': logoHeartActive,
      'pin': logoPinLight,
      'pinActive': logoPinLightActive,
      'createAThread': logoCreateAThreadLight
    },
    "dark": {
      'logo': logoDark,
      'home': logoHomeDark,
      'homeActive': logoHomeDarkActive,
      'search': logoSearchDark,
      'searchActive': logoSearchDarkActive,
      'heart': logoHeartDark,
      'heartActive': logoHeartActive,
      'user': logoUserDark,
      'userActive': logoPinDarkDarkActive,
      'pin': logoPinDark,
      'pinActive': logoPinDarkActive,
      'createAThread': logoDarkCreateAThread
    }
  }, 
  reducers : {
    test : (state)=>{}
  }
});
// exporting actions
export const  {test} = iconsSlice.actions;

// exporting reducers
const reducericonsSlice = iconsSlice.reducer;
export default reducericonsSlice;
