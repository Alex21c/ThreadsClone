import { createSlice } from "@reduxjs/toolkit";
// White theme
  import logoWhite from '../../Assests/Images/Icons/White/logo.svg';
  import logoHomeWhite from '../../Assests/Images/Icons/White/home.svg';
  import logoHomeActiveWhite from '../../Assests/Images/Icons/White/homeActive.svg';
  import logoSearchWhite from '../../Assests/Images/Icons/White/search.svg';
  import logoSearchActiveWhite from '../../Assests/Images/Icons/White/searchActive.svg';
  import logoHeartWhite from '../../Assests/Images/Icons/White/heart.svg';
  import logoHeartActiveWhite from '../../Assests/Images/Icons/White/heartActive.svg';
  import logoUserWhite from '../../Assests/Images/Icons/White/user.svg';
  import logoUserActiveWhite from '../../Assests/Images/Icons/White/userActive.svg';
  import logoPinWhite from '../../Assests/Images/Icons/White/pin.svg';
  import logoPinActiveWhite from '../../Assests/Images/Icons/White/pinActive.svg';
  import logoCreateAPostWhite from '../../Assests/Images/Icons/White/createAPost.svg';
  
// dark theme


export const iconsSlice = createSlice({
  name: "icons", 
  initialState: {
    'logo': logoWhite,
    'home': logoHomeWhite,
    'homeActive': logoHomeActiveWhite,
    'search': logoSearchWhite,
    'searchActive': logoSearchActiveWhite,
    'heart': logoHeartWhite,
    'heartActive': logoHeartActiveWhite,
    'user': logoUserWhite,
    'userActive': logoUserActiveWhite,
    'pin': logoPinWhite,
    'pinActive': logoPinActiveWhite,
    'createAPost': logoCreateAPostWhite,
    'reply': "",
    'repost': "",
    'share': ""
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
