import { configureStore } from "@reduxjs/toolkit";
import { navigationReducer } from "../components/Navigation/navigationSlice";
import { spinnerReducer } from "../components/Spinner/spinnerSlice";

export const store = configureStore({
  reducer: {
    spinner: spinnerReducer,
    page: navigationReducer,
  },
});
