import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  assets: [],
};

const assetSlice = createSlice({
  name: "assets",
  initialState,
  reducers: {
    createAsset: (state, action) => {
      state.assets.push(action.payload);
    },
    deleteAsset: (state, action) => {
      state.assets = state.assets.filter(
        (wo) => wo.id !== action.payload.id
      );
    },
    updateAsset: (state, action) => {
      const assetIndex = state.assets.findIndex((wo) => wo.id === action.payload.id);
      state.assets.splice(assetIndex, 1, action.payload);
    }
  },
});

export const { createAsset, deleteAsset, updateAsset } = assetSlice.actions;
export default assetSlice.reducer;
