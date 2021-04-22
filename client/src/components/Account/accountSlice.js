import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";

import { getCookie } from "../../app/utils";
import { showSpinner, hideSpinner } from "../Spinner/spinnerSlice";
import {
  getCsrfTokenUrl,
  myProfileUrl,
  loginUrl,
  accountsUrl,
  resetPasswordUrl,
  resetPasswordConfirmUrl,
} from "../../app/constants";

export const accountSlice = createSlice({
  name: "account",
  initialState: {
    isUserInitialized: false,
    isLoggedIn: false,
    user: null,
    error: false,
    errorMessage: "",
    csrfToken: null,
  },
  reducers: {
    setUserInitialized: (state) => {
      state.isUserInitialized = true;
    },
    signActionFail: (state, action) => {
      state.error = true;
      state.errorMessage = action.payload || "Something went wrong!";
    },
    signInSuccess: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.error = false;
      state.errorMessage = "";
    },
    signOutSuccess: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.error = false;
      state.errorMessage = "";
    },
    resetPasswordSuccess: (state) => {
      state.error = false;
    },
    setError: (state, action) => {
      const { errorState, errorMessage = "ALARM!" } = action.payload;
      state.error = !!errorState;
      state.errorMessage = errorMessage;
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
  resetPasswordSuccess,
  setError,
  setCsrfToken,
} = accountSlice.actions;

export const getCsrfToken = () => async (dispatch) => {
  const { data } = await axios.get(getCsrfTokenUrl);
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
  const { data } = await axios.get(myProfileUrl);
  if (data?.username) {
    return data;
  }
};

export const signIn = (credentials = {}) => async (dispatch) => {
  dispatch(showSpinner());
  const csrfToken = await dispatch(getCsrfToken());
  let responseStatus = false;

  try {
    const { username, password } = credentials;
    const data = await axios.post(
      loginUrl,
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

    const user = await dispatch(getUserData());
    dispatch(signInSuccess(user));
    responseStatus = true;
  } catch (error) {
    console.log("SIGN IN FAILED!");
    console.log(error.response);
    dispatch(signActionFail(error.response.data));
  }

  dispatch(hideSpinner());
  return responseStatus;
};

export const signUp = (credentials = {}) => async (dispatch) => {
  dispatch(showSpinner());
  const csrfToken = await dispatch(getCsrfToken());

  try {
    const { username, email, password } = credentials;
    const data = await axios.post(
      accountsUrl,
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
      dispatch(signIn({ username, password }));
    }
  } catch (error) {
    console.log("SIGN UP FAILED!");
    console.log(error.response);
    dispatch(signActionFail(error.response.data));
  }
  dispatch(hideSpinner());
};

export const updateUser = (userData = {}) => async (dispatch) => {
  dispatch(showSpinner());
  const csrfToken = await dispatch(getCsrfToken());
  let responseStatus = false;

  try {
    const { email, password, first_name, last_name } = userData;
    const userUpdatedData = { first_name, last_name };
    email && (userUpdatedData.email = email);
    password && (userUpdatedData.password = password);
    const data = await axios.patch(myProfileUrl, userUpdatedData, {
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
      },
    });

    if (data.status >= 400) {
      dispatch(hideSpinner());
      signActionFail();
      return responseStatus;
    }
    if (data.status === 200) {
      dispatch(updateCsrfToken());
      // const user = await dispatch(getUserData());
      dispatch(signInSuccess(data.data));
      responseStatus = true;
    }
  } catch (error) {
    console.log("UPDATE FAILED!");
    console.log(error.response);
    dispatch(signActionFail(error.response.data));
  }
  dispatch(hideSpinner());
  return responseStatus;
};

export const signOut = () => async (dispatch) => {
  dispatch(showSpinner());
  const csrfToken = await dispatch(getCsrfToken());
  try {
    await axios.delete(myProfileUrl, {
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
      },
    });
    dispatch(signOutSuccess());
  } catch (error) {
    console.log("SIGN OUT FAILED!");
    console.log(error.response);
    dispatch(signActionFail(error.response.data));
  }
  dispatch(hideSpinner());
};

export const resetPassword = (email) => async (dispatch) => {
  dispatch(showSpinner());
  const csrfToken = await dispatch(getCsrfToken());
  let responseStatus = false;

  try {
    const data = await axios.post(
      resetPasswordUrl,
      {
        email,
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
      signActionFail(data.statusText);
      return responseStatus;
    }

    dispatch(updateCsrfToken());
    dispatch(resetPasswordSuccess());
    responseStatus = true;
  } catch (error) {
    console.log("RESET FAILED!");
    console.log(error.response);
    dispatch(signActionFail(error.response.data));
  }

  dispatch(hideSpinner());
  return responseStatus;
};

export const resetPasswordConfirm = (data) => async (dispatch) => {
  dispatch(showSpinner());
  const csrfToken = await dispatch(getCsrfToken());
  let responseStatus = false;
  const { password, token } = data;

  try {
    if (token) {
      const data = await axios.post(
        resetPasswordConfirmUrl,
        {
          password,
          token,
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
        signActionFail(data.statusText);
        return responseStatus;
      }

      dispatch(updateCsrfToken());
    }

    dispatch(resetPasswordSuccess());
    responseStatus = true;
  } catch (error) {
    console.log("RESET FAILED!");
    console.log(error.response);
    dispatch(signActionFail(error.response.data));
  }

  dispatch(hideSpinner());
  return responseStatus;
};

export const { reducer: accountReducer } = accountSlice;
