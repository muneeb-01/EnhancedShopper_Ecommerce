import { createSlice } from "@reduxjs/toolkit";

export const userInfoSlice = createSlice({
  name: "userInfo",
  initialState: null,
  reducers: {
    setUserInfo: (state, action) => {
      console.log(action.payload);
      state = action.payload;
      return state;
    },
  },
});

export const userInfoActions = userInfoSlice.actions;
