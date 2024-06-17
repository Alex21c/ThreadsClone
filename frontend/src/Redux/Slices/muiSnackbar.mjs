import { createSlice } from "@reduxjs/toolkit";


export const muiSnackbarSlice = createSlice({
  name: 'muiSnackbar',
  initialState: {
    open: true,
    message: 'hi'

  },
  reducers: {
    openTheMuiSnackbar: (state)=>{
      state.open= true;
    },
    closeTheMuiSnackbar: (state)=>{
      state.open= false;
    }
  }
});

export const {openTheMuiSnackbar, closeTheMuiSnackbar} = muiSnackbarSlice.actions;
const muiSnackbarReducer = muiSnackbarSlice.reducer;
export default muiSnackbarReducer;



