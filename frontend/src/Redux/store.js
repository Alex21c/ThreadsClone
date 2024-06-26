import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./Slices/themeSlice.mjs";
import muiModalHavingQrCodeForAppDownloadSliceReducer from './Slices/muiModalHavingQrCodeForAppDownloadSlice.mjs';
import muiModalCreateNewThreadSliceReducer from './Slices/muiModalCreateNewThreadSlice.mjs';
import muiModalCreateNewReplySliceReducer from "./Slices/muiModalCreateNewReplySlice.mjs";
import reducerReplySlice from "./Slices/replySlice.mjs";
import muiSnackbarReducer from "./Slices/muiSnackbarSlice.mjs";
import reducerAuthSlice from "./Slices/authSlice.mjs";
import reducericonsSlice from "./Slices/iconsSlice.mjs";
import reducerUserSlice from "./Slices/userSlice.mjs";
import reducerThreadsSlice from "./Slices/threadsSlice.mjs";
import reducerHandshakeSlice from "./Slices/handshakeSlice.mjs";
export const store = configureStore({
  reducer: {
    'theme': themeReducer,
    'muiModalHavingQrCodeForAppDownload': muiModalHavingQrCodeForAppDownloadSliceReducer,
    'muiModalCreateNewThread': muiModalCreateNewThreadSliceReducer,
    'muiModalCreateNewReply': muiModalCreateNewReplySliceReducer,
    'muiSnackbar': muiSnackbarReducer,
    'auth': reducerAuthSlice,
    'icons': reducericonsSlice,
    'user': reducerUserSlice,
    'threads': reducerThreadsSlice,
    'replies': reducerReplySlice,
    'handshake': reducerHandshakeSlice
  }
});
