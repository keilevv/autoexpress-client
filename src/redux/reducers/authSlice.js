// In your store.js or a new authSlice.js file
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    user: null,
    accessToken: null,
  },
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      const { accessToken, ...userData } = action.payload;
      state.user = userData;
      state.accessToken = accessToken;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.accessToken = null;
    },
    setUserData: (state, action) => {
      state.user = action.payload;
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
  },
});

export const { login, logout, setAccessToken, setUserData } = authSlice.actions;
export default authSlice.reducer;
