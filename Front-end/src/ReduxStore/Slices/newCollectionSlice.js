import { createSlice } from "@reduxjs/toolkit";

export const newCollectionSlice = createSlice({
  name: "newCollectionSlice",
  initialState: [],
  reducers: {
    setNewCollection: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

export const newCollectionSliceActions = newCollectionSlice.actions;
