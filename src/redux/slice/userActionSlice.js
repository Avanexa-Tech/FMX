import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  showWorkOrderForm: false,
  showAssetForm : false,
};

const userActionSlice = createSlice({
  name: "user_action",
  initialState,
  reducers: {
    toggleShowCreateWorkOrder(state , action) {
      state.showWorkOrderForm = action.payload;
    },
    toggleShowAssetCreationForm(state, action){
      state.showAssetForm = action.payload;
    }
  },
});

export const {
  toggleShowCreateWorkOrder,
  toggleShowAssetCreationForm
} = userActionSlice.actions;
export default userActionSlice.reducer;
