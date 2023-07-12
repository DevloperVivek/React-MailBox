import { createSlice } from "@reduxjs/toolkit";

const initalAuth = { id: "", email: "", isLogin: false };

const AuthSlice = createSlice({
  name: "Auth",
  initialState: initalAuth,
  reducers: {
    login: (state, action) => {
      localStorage.setItem("login", JSON.stringify(action.payload));
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.isLogin = true;
    },
    logout: (state) => {
      localStorage.removeItem("login");
      state.id = "";
      state.email = "";
      state.isLogin = false;
    },
  },
});

export const AuthAction = AuthSlice.actions;
export default AuthSlice.reducer;
