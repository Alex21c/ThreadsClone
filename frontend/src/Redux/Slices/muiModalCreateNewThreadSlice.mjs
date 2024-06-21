import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false
};

export const muiModalCreateNewThreadSlice = createSlice({
  name: 'muiModalHavingQrCodeForAppDownload',
  initialState,
  reducers: {
    openMuiModalCreateNewThread: (state)=>{
      state.open= true
    },
    closeMuiModalCreateNewThread: (state)=>{
      state.open= false
    }
  }
});

export const {openMuiModalCreateNewThread, closeMuiModalCreateNewThread} = muiModalCreateNewThreadSlice.actions;
const muiModalCreateNewThreadSliceReducer = muiModalCreateNewThreadSlice.reducer;
export default muiModalCreateNewThreadSliceReducer;





