import { createSlice } from "@reduxjs/toolkit";

// 1. Check if there is a user already saved in the browser's memory
// This ensures that if the user refresh the page, user stays logged in!
const userFromStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const initialState = {
  user: userFromStorage,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  // 2. Reducers are the "Actions" that change the state
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload; // action.payload is the user data from backend
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload; // action.payload is the error message
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});

// Export the actions so it can be used in the components
export const { loginStart, loginSuccess, loginFailure, logout } =
  authSlice.actions;

export default authSlice.reducer;
