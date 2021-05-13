import { configureStore } from "@reduxjs/toolkit";
import { navigationReducer } from "../components/Navigation/navigationSlice";
import { spinnerReducer } from "../components/Spinner/spinnerSlice";
import { accountReducer } from "../components/Account/accountSlice";
import { customPageReducer } from "../components/CustomPage/customPageSlice";
import { cookiesConsentReducer } from "../components/CookiesModal/cookiesConsentSlice";

export const store = configureStore({
  reducer: {
    spinner: spinnerReducer,
    page: navigationReducer,
    account: accountReducer,
    customPage: customPageReducer,
    cookiesConsent: cookiesConsentReducer,
  },
});
