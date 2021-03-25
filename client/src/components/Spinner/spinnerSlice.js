import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  visible: false,
};

export const spinnerSlice = createSlice({
  name: "spinner",
  initialState,
  reducers: {
    showSpinner: (state) => {
      state.visible = true;
    },
    hideSpinner: (state) => {
      state.visible = false;
    },
  },
});

export const { showSpinner, hideSpinner } = spinnerSlice.actions;

export const isVisibleValue = (state) => state.spinner.visible;

export const { reducer: spinnerReducer } = spinnerSlice;
