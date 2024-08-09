import { configureStore } from "@reduxjs/toolkit";
import { userInfoSlice } from "../../../Front-end/src/ReduxStore/Slices/userInfoSlice";

export const ReduxStore = configureStore({
  reducer: {
    userInfo: userInfoSlice.reducer,
  },
});
