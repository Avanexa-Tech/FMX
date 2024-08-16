import { configureStore } from "@reduxjs/toolkit";
import userActionReducer from "./slice/userActionSlice";
import workOrderReducer from "./slice/workOrderSlice";

const store = configureStore({
  reducer: {
    user_action: userActionReducer,
    work_order: workOrderReducer,
  },
});

export default store;
