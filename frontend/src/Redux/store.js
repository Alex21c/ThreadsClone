import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./Slices/themeSlice.mjs";
import muiModalHavingQrCodeForAppDownloadSliceReducer from "./Slices/muiModalHavingQrCodeForAppDownloadSlice.mjs";
export const store = configureStore({
  reducer: {
    theme: themeReducer,
    muiModalHavingQrCodeForAppDownload: muiModalHavingQrCodeForAppDownloadSliceReducer
  }
});
