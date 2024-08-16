import { configureStore } from "@reduxjs/toolkit";
import userActionReducer from "./userActionSlice";

const store = configureStore({
  reducer: {
    user_action: userActionReducer,
  },
});

export default store;
