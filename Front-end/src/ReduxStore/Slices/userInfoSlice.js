import { createSlice } from "@reduxjs/toolkit";

export const userInfoSlice = createSlice({
  name: "userInfo",
  initialState: null,
  reducers: {
    setUserInfo: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

export const userInfoActions = userInfoSlice.actions;
