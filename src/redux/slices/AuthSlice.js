import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuth: false,
  },
  reducer: {
    loginUser: (state, action) => {
      state.user = action.payload;
      state.isAuth = true;
    },

    logoutUser: (state) => {
      state.user = null;
      state.isAuth = false;
    },
  },
});

export const { loginUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;
