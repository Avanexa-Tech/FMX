import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  showWorkOrder: false,
  showCreateWorkOrder: true,
  workOrderCount : 0
};

const userActionSlice = createSlice({
  name: "user_action",
  initialState,
  reducers: {
    toggleWorkOrder(state) {
      state.showWorkOrder = !state.showWorkOrder;
    },
    toggleShowCreateWorkOrder(state) {
      state.showCreateWorkOrder = !state.showCreateWorkOrder;
    },
    incrementWorkOrderCount(state) {
      state.workOrderCount++;
    },
    decrementWorkOrderCount(state) {
      state.workOrderCount++;
    },
    resetAllExpectWo(state){
      state.showWorkOrder = false;
    }
  },
});

export const { toggleWorkOrder, toggleShowCreateWorkOrder, incrementWorkOrderCount, decrementWorkOrderCount, resetAllExpectWo } = userActionSlice.actions;
export default userActionSlice.reducer;
