import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import {
  signInSuccess,
  setUserInitialized,
} from "./components/Account/accountSlice";
import { showSpinner, hideSpinner } from "./components/Spinner/spinnerSlice";
import { myProfileUrl } from "./app/constants";

export function InitApp() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      dispatch(showSpinner());
      try {
        const data = await axios.get(myProfileUrl);

        if (data.status === 200) {
          const { data: user } = data;
          dispatch(signInSuccess(user));
        }
      } catch (err) {
        console.log("Initial sign in: no saved session.");
      }
      dispatch(hideSpinner());
      dispatch(setUserInitialized());
    }
    fetchData();
  }, [dispatch]);

  return null;
}
