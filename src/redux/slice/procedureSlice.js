import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  procedures: [],
};

const procedureSlice = createSlice({
  name: "procedure",
  initialState,
  reducers: {
    addProcedure: (state, action) => {
      state.procedures.push({
        id: state.procedures[-1]?.id ? state.procedures[-1].id + 1 : 1,
        ...action.payload,
      });
    },
    updateProcedure: (state, action) => {
      const index = state.procedures.findIndex((item) => item?.id === action.payload.id);
      state.procedures.splice(index, 1, action.payload);
    },
    deleteProcedure: (state, action) => {
      state.procedures = state.procedures.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addProcedure, updateProcedure, deleteProcedure } = procedureSlice.actions;
export default procedureSlice.reducer;
