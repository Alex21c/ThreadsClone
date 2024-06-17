import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./Slices/themeSlice.mjs";
import muiModalHavingQrCodeForAppDownloadSliceReducer from './Slices/muiModalHavingQrCodeForAppDownloadSlice.mjs';
import muiSnackbarReducer from "./Slices/muiSnackbarSlice.mjs";
import reducerAuthSlice from "./Slices/authSlice.mjs";

export const store = configureStore({
  reducer: {
    'theme': themeReducer,
    'muiModalHavingQrCodeForAppDownload': muiModalHavingQrCodeForAppDownloadSliceReducer,
    'muiSnackbar': muiSnackbarReducer,
    'auth': reducerAuthSlice
  }
});
