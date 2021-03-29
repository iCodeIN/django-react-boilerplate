import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";

import { getCookie } from "../../app/utils";
import { showSpinner, hideSpinner } from "../Spinner/spinnerSlice";
import { serverUrl } from "../../app/constants";

export const accountSlice = createSlice({
  name: "account",
  initialState: {
    isUserInitialized: false,
    isLoggedIn: false,
    user: null,
    error: false,
    csrfToken: null,
  },
  reducers: {
    setUserInitialized: (state) => {
      state.isUserInitialized = true;
    },
    signActionFail: (state) => {
      state.error = true;
    },
    signInSuccess: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.error = false;
    },
    signOutSuccess: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.error = false;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setCsrfToken: (state, action) => {
      state.csrfToken = action.payload;
    },
  },
});

export const {
  setUserInitialized,
  signActionFail,
  signInSuccess,
  signOutSuccess,
  setError,
  setCsrfToken,
} = accountSlice.actions;

export const getCsrfToken = () => async (dispatch) => {
  const { data } = await axios.get(`${serverUrl}/users/get_csrf/`);
  if (data?.detail) {
    const csrfToken = getCookie("csrftoken");
    dispatch(setCsrfToken(csrfToken));

    return csrfToken;
  }
};

export const updateCsrfToken = () => (dispatch) => {
  const csrfToken = getCookie("csrftoken");
  dispatch(setCsrfToken(csrfToken));

  return csrfToken;
};

export const getUserData = () => async () => {
  const { data } = await axios.get(`${serverUrl}/users/me/`);
  if (data?.username) {
    return data;
  }
};

export const signIn = (credentials) => async (dispatch) => {
  dispatch(showSpinner());
  const csrfToken = await dispatch(getCsrfToken());
  let responseStatus = false;

  try {
    if (credentials) {
      const { username, password } = credentials;
      const data = await axios.post(
        `${serverUrl}/users/login/`,
        {
          username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken,
          },
        }
      );

      if (data.status !== 200) {
        dispatch(hideSpinner());
        signActionFail();
        return responseStatus;
      }

      dispatch(updateCsrfToken());
    }
    const user = await dispatch(getUserData());
    dispatch(signInSuccess(user));
    responseStatus = true;
  } catch (error) {
    console.log("SIGN IN FAILED!");
    console.log(error.response);
    dispatch(signActionFail());
  }

  dispatch(hideSpinner());
  return responseStatus;
};

export const signUp = (credentials) => async (dispatch) => {
  dispatch(showSpinner());
  const csrfToken = await dispatch(getCsrfToken());

  try {
    if (credentials) {
      const { username, email, password } = credentials;
      const data  = await axios.post(
        `${serverUrl}/users/register/`,
        {
          username,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken,
          },
        }
      );

      if (data.status >= 400) {
        dispatch(hideSpinner());
        signActionFail();
        return;
      }
      if (data.status === 201) {
        dispatch(updateCsrfToken());
        dispatch(signIn({username, password}))
      }
    }
  } catch (error) {
    console.log("SIGN UP FAILED!");
    console.log(error.response);
    dispatch(signActionFail());
  }
  dispatch(hideSpinner());
};

export const signOut = () => async (dispatch) => {
  dispatch(showSpinner());
  const csrfToken = await dispatch(getCsrfToken());
  try {
    await axios.post(
      `${serverUrl}/users/logout/`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
        },
      }
    );
    dispatch(signOutSuccess());
  } catch (error) {
    console.log("SIGN OUT FAILED!");
    console.log(error.response);
    dispatch(signActionFail());
  }
  dispatch(hideSpinner());
};

export const { reducer: accountReducer } = accountSlice;
