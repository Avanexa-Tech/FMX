import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  workOrders: [],
};

const workOrderSlice = createSlice({
  name: "work_order",
  initialState,
  reducers: {
    createWorkOrder: (state, action) => {
      state.workOrders.push(action.payload);
    },
    deleteWorkOrder: (state, action) => {
      state.workOrders = state.workOrders.filter(
        (wo) => wo.id !== action.payload
      );
    },
  },
});

export const { createWorkOrder, deleteWorkOrder } = workOrderSlice.actions;
export default workOrderSlice.reducer;
