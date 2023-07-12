import { configureStore } from "@reduxjs/toolkit";
import AuthRedux from "./AuthRedux";

const store = configureStore({
  reducer: { auth: AuthRedux },
});

export default store;
