import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
};

export const muiModalEditProfile = createSlice({
  name: "muiModalEditProfile",
  initialState,
  reducers: {
    openMuiModalEditProfile: (state) => {
      state.open = true;
    },
    closeMuiModalEditProfile: (state) => {
      state.open = false;
    },
  },
});

export const { openMuiModalEditProfile, closeMuiModalEditProfile } =
  muiModalEditProfile.actions;
const muiModalEditProfileReducer = muiModalEditProfile.reducer;
export default muiModalEditProfileReducer;
