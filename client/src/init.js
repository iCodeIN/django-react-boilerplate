import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { signInSuccess } from "./components/Account/accountSlice";
import { showSpinner, hideSpinner } from "./components/Spinner/spinnerSlice";
import { serverUrl } from "./app/constants";

export function InitApp() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      dispatch(showSpinner());
      try {
        const data = await axios.get(`${serverUrl}/users/me/`);

        if (data.status === 200) {
          const {data: user} = data;
          dispatch(signInSuccess(user));
        }
      } catch (err) {
        console.log("Initial sign in failed!");
        console.log(err);
      }
      dispatch(hideSpinner());
    }
    fetchData();
  }, [dispatch]);

  return null;
}
