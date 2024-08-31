import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  preventiveMaintenance: [],
};

const preventiveMaintenanceSlice = createSlice({
  name: "preventive_maintenance",
  initialState,
  reducers: {
    createPreventiveMaintenance: (state, action) => {
      state.preventiveMaintenance.push(action.payload);
    },
    deletePreventiveMaintenance: (state, action) => {
      state.preventiveMaintenance = state.preventiveMaintenance.filter((pm) => pm.id !== action.payload.id);
    },
    updatePreventiveMaintenance: (state, action) => {
      const pmIndex = state.preventiveMaintenance.findIndex((pm) => pm.id === action.payload.id);
      state.preventiveMaintenance.splice(pmIndex, 1, action.payload);
    },
  },
});

export const { createPreventiveMaintenance, deletePreventiveMaintenance, updatePreventiveMaintenance } = preventiveMaintenanceSlice.actions;
export default preventiveMaintenanceSlice.reducer;
