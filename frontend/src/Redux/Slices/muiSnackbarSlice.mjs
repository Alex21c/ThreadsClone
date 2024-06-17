import { createSlice } from "@reduxjs/toolkit";

export const muiSnackbarSlice = createSlice({
  name: 'muiSnackbar',
  initialState: {
    open: true,
    message: 'Success !',
    type: 'Success'

  },
  reducers: {
    openTheMuiSnackbar: (state, action)=>{
      state.open= true;
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    closeTheMuiSnackbar: (state)=>{
      state.open= false;
    }

  }
});

export const {openTheMuiSnackbar, closeTheMuiSnackbar} = muiSnackbarSlice.actions;
const muiSnackbarReducer = muiSnackbarSlice.reducer;
export default muiSnackbarReducer;



