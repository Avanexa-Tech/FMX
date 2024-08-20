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
      console.log(action.payload , "asdas")
      state.workOrders = state.workOrders.filter(
        (wo) => wo.id !== action.payload.id
      );
    },
    updateWorkOrder: (state, action) => {
      const workOrder = state.workOrders.find(wo => wo.id === action.payload.id).status = action.payload.status;
    }
  },
});

export const { createWorkOrder, deleteWorkOrder,updateWorkOrder } = workOrderSlice.actions;
export default workOrderSlice.reducer;
