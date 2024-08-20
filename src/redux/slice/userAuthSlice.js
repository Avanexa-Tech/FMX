import { createSlice } from "@reduxjs/toolkit";

const initialState = { user: {}, signupMock: {} };

const userAuthSlice = createSlice({
  name: "user_auth",
  initialState,
  reducers: {
    userData: (state, action) => {
      state.user = action.payload;
      state.signupMock = action.payload;
    },
    logout: (state) => {
      state.user = {};
    },
  },
});

export const { userData, logout } = userAuthSlice.actions;
export default userAuthSlice.reducer;
