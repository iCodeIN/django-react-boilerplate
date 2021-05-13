import { createSlice } from "@reduxjs/toolkit";

import { getCookie } from "../../app/utils";

const initialState = {
  visible: false,
  confirmed: false,
};

export const cookiesConsentSlice = createSlice({
  name: "cookiesConsent",
  initialState,
  reducers: {
    showModal: (state) => {
      state.visible = true;
    },
    hideModal: (state) => {
      state.visible = false;
    },
    setConfirmed: (state, action) => {
      state.confirmed = action.payload;
    },
  },
});

export const { showModal, hideModal, setConfirmed } = cookiesConsentSlice.actions;

export const initCookiesConsent = () => async (dispatch) => {
  const isCookiesSet = !!getCookie("accepted");
  dispatch(setConfirmed(isCookiesSet));
  if (!isCookiesSet) {
    dispatch(showModal());
  }
};

export const { reducer: cookiesConsentReducer } = cookiesConsentSlice;
