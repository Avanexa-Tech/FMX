import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  procedures: [],
};

const procedureSlice = createSlice({
  name: "procedure",
  initialState,
  reducers: {
    addProcedure: (state, action) => {
      state.procedures.push(action.payload);
    },
  },
});

export const { addProcedure } = procedureSlice.actions;
export default procedureSlice.reducer;
