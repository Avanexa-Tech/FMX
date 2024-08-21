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
        (wo) => wo.id !== action.payload.id
      );
    },
    updateWorkOrder: (state, action) => {
      const woIndex = state.workOrders.findIndex((wo) => wo.id === action.payload.id);
      state.workOrders.splice(woIndex, 1, action.payload);
    }
  },
});

export const { createWorkOrder, deleteWorkOrder,updateWorkOrder } = workOrderSlice.actions;
export default workOrderSlice.reducer;
