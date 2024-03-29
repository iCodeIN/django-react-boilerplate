import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import {
  signInSuccess,
  setUserInitialized,
} from "./components/Account/accountSlice";
import { getCustomPagesList } from "./components/CustomPage/customPageSlice";
import { showSpinner, hideSpinner } from "./components/Spinner/spinnerSlice";
import { initCookiesConsent } from "./components/CookiesModal/cookiesConsentSlice";
import { myProfileUrl } from "./app/constants";

export function InitApp() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      dispatch(showSpinner());

      // Init Cookies consent modal
      dispatch(initCookiesConsent())

      // Load Custom Pages list
      try {
        dispatch(getCustomPagesList());
      } catch (err) {
        console.log("Failed load: no custom pages' data.");
      }

      // Load user's session
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
