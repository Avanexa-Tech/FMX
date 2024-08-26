import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userAuthReducer from "./slice/userAuthSlice";
import userActionReducer from "./slice/userActionSlice";
import workOrderReducer from "./slice/workOrderSlice";
import procedureReducer from "./slice/procedureSlice";

const rootReducers = combineReducers({
  user_auth: userAuthReducer,
  user_action: userActionReducer,
  work_order: workOrderReducer,
  procedure: procedureReducer,
});

const persistedReducer = persistReducer({ key: "root", storage }, rootReducers);

const store = configureStore({ reducer: persistedReducer });

const persistor = persistStore(store);

export { store, persistor };
