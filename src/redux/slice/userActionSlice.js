import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  showWorkOrderForm: false,
};

const userActionSlice = createSlice({
  name: "user_action",
  initialState,
  reducers: {
    toggleShowCreateWorkOrder(state , action) {
      state.showWorkOrderForm = action.payload;
    },
  },
});

export const {
  toggleShowCreateWorkOrder,
} = userActionSlice.actions;
export default userActionSlice.reducer;
