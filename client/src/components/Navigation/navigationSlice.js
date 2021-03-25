import { createSlice } from "@reduxjs/toolkit";

export const navigationSlice = createSlice({
  name: "page",
  initialState: {
    loading: false,
    pageTitle: "",
  },
  reducers: {
    updatePageTitle: (state, action) => {
      state.pageTitle = action.payload;
    },
  },
});

export const { updatePageTitle } = navigationSlice.actions;

export const pageTitleValue = (state) => state.page.pageTitle;

export const { reducer: navigationReducer } = navigationSlice;
