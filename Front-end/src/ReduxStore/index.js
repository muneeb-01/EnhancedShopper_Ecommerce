import { configureStore } from "@reduxjs/toolkit";
import { userInfoSlice } from "./Slices/userInfoSlice";
import { personalInformation } from "./Slices/personal-information-slice";
import { productSlice } from "./Slices/productsSlice";
import { newCollectionSlice } from "./Slices/newCollectionSlice";

export const ReduxStore = configureStore({
  reducer: {
    userInfo: userInfoSlice.reducer,
    personalInfo: personalInformation.reducer,
    allProducts: productSlice.reducer,
    newCollection: newCollectionSlice.reducer,
  },
});
