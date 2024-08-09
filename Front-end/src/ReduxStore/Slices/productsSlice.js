import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "allProducts",
  initialState: null,
  reducers: {
    setProducts: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

export const productAction = productSlice.actions;
