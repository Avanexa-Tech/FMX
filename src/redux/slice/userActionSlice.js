import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  showPreventiveMaintenanceForm: false,
  showWorkOrderForm: false,
  showAssetForm: false,
};

const userActionSlice = createSlice({
  name: "user_action",
  initialState,
  reducers: {
    toggleShowCreateWorkOrder(state, action) {
      state.showWorkOrderForm = action.payload;
    },
    toggleShowAssetCreationForm(state, action) {
      state.showAssetForm = action.payload;
    },
    toggleShowCreatePreventiveMaintenance(state, action) {
      state.showPreventiveMaintenanceForm = action.payload;
    },
  },
});

export const { toggleShowCreateWorkOrder, toggleShowAssetCreationForm, toggleShowCreatePreventiveMaintenance } = userActionSlice.actions;
export default userActionSlice.reducer;
