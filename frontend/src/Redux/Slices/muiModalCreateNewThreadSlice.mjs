import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: true
};

export const muiModalCreateNewThreadSlice = createSlice({
  name: 'muiModalHavingQrCodeForAppDownload',
  initialState,
  reducers: {
    openMuiModalCreateNewThreadSlice: (state)=>{
      state.open= true
    },
    closeMuiModalCreateNewThreadSlice: (state)=>{
      state.open= false
    }
  }
});

export const {openMuiModalCreateNewThreadSlice, closeMuiModalCreateNewThreadSlice} = muiModalCreateNewThreadSlice.actions;
const muiModalCreateNewThreadSliceReducer = muiModalCreateNewThreadSlice.reducer;
export default muiModalCreateNewThreadSliceReducer;





