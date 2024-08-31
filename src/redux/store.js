import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userAuthReducer from "./slice/userAuthSlice";
import userActionReducer from "./slice/userActionSlice";
import workOrderReducer from "./slice/workOrderSlice";
import procedureReducer from "./slice/procedureSlice";
import assetsReducer from "./slice/assetSlice";
import sharedDataSlice from "./slice/sharedDataSlice";
import preventiveMaintenanceReducer from "./slice/preventiveMaintenanceSlice";

const rootReducers = combineReducers({
  user_auth: userAuthReducer,
  user_action: userActionReducer,
  work_order: workOrderReducer,
  preventive_maintenance: preventiveMaintenanceReducer,
  procedure: procedureReducer,
  assets: assetsReducer,
  shared: sharedDataSlice,
});

const persistedReducer = persistReducer({ key: "root", storage }, rootReducers);

const store = configureStore({ reducer: persistedReducer });

const persistor = persistStore(store);

export { store, persistor };
