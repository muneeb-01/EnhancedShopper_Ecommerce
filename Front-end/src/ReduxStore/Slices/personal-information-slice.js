import { createSlice } from "@reduxjs/toolkit";

export const personalInformation = createSlice({
  name: "personalInfo",
  initialState: null,
  reducers: {
    setPersonalInformation: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

export const personalInformationAction = personalInformation.actions;
