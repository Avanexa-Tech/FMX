import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    asset: [],
    location: [],
    vendor: [],
    category: [],
};

const sharedDataSlice = createSlice({
  name: "shared",
  initialState,
  reducers: {
      addAsset: (state, action) => {
      state.asset.push(action.payload);
    },
    addLocation: (state, action) => {
      state.location.push(action.payload);
    },
    addVendor: (state, action) => {
      state.vendor.push(action.payload);
    },
    addCategories: (state, action) => {
      state.category.push(action.payload);
    },
  },
});

export const { addAsset, addCategories, addLocation, addVendor } = sharedDataSlice.actions;
export default sharedDataSlice.reducer;