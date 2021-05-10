import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";

import { customPageListUrl } from "../../app/constants";

export const customPageSlice = createSlice({
  name: "customPage",
  initialState: {
    pagesList: [],
    pages: {},
  },
  reducers: {
    setPagesList: (state, action) => {
      state.pagesList = action.payload;
    },
    setCustomPage: (state, action) => {
      const {url} = action.payload;
      state.pages[url] = action.payload;
    },
  },
});

export const { setPagesList, setCustomPage } = customPageSlice.actions;

export const getCustomPagesList = () => async (dispatch) => {
  try {
    const data = await axios.get(customPageListUrl);

    if (data.status !== 200) {
      console.log("SERVER ERROR?!");
      console.log(data?.data);
      return;
    }

    const customPagesList = data.data;
    dispatch(setPagesList(customPagesList));
  } catch (error) {
    console.log("SERVER ERROR?!");
    console.log(error.response);
  }
};

export const getCustomPage = (pageUrl = "") => async (dispatch) => {
  try {
    const data = await axios.get(`${customPageListUrl}${pageUrl}`);

    if (data.status !== 200) {
      console.log("SERVER ERROR?!");
      console.log(data?.data);
      return;
    }

    const customPageData = data.data;
    dispatch(setCustomPage(customPageData));
  } catch (error) {
    console.log("SERVER ERROR?!");
    console.log(error.response);
  }
};

export const { reducer: customPageReducer } = customPageSlice;
