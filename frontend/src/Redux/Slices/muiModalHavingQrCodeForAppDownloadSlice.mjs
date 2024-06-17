import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false
};

export const muiModalHavingQrCodeForAppDownloadSlice = createSlice({
  name: 'muiModalHavingQrCodeForAppDownload',
  initialState,
  reducers: {
    openMuiModalHavingQrCodeForAppDownloadSlice: (state)=>{
      state.open= true
    },
    closeMuiModalHavingQrCodeForAppDownloadSlice: (state)=>{
      state.open= false
    }
  }
});

export const {openMuiModalHavingQrCodeForAppDownloadSlice, closeMuiModalHavingQrCodeForAppDownloadSlice} = muiModalHavingQrCodeForAppDownloadSlice.actions;
const muiModalHavingQrCodeForAppDownloadSliceReducer = muiModalHavingQrCodeForAppDownloadSlice.reducer;
export default muiModalHavingQrCodeForAppDownloadSliceReducer;





