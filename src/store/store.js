import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./login";
import giohangReducer from "./giohang";

const store = configureStore({
  reducer: {
    user: userReducer,
    giohang: giohangReducer,
  },
});

export default store;
