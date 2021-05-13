import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { SnackbarProvider } from "notistack";

import { HomePage } from "./pages/Home";
import { AccountPage } from "./pages/Account";
import { CustomPage } from "./pages/Custom";
import { Error404Page } from "./pages/Error";

import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { CookiesModal } from "./components/CookiesModal";
import { Spinner } from "./components/Spinner";

import {
  hideModal,
  showModal,
} from "./components/CookiesModal/cookiesConsentSlice";

function App() {
  const dispatch = useDispatch();

  const isUserInitialized = useSelector(
    (state) => state.account.isUserInitialized
  );
  const isConfirmed = useSelector((state) => state.cookiesConsent.confirmed);

  useEffect(() => {
    if (isConfirmed) {
      dispatch(hideModal());
    } else {
      dispatch(showModal());
    }
  }, [isConfirmed, dispatch]);

  return (
    <SnackbarProvider maxSnack={3}>
      <Spinner />
      {isUserInitialized && (
        <>
          <Header />
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/login" component={AccountPage} />
            <Route path="/reset-password" component={AccountPage} />
            <Route path="/register" component={AccountPage} />
            <Route path="/dashboard" component={AccountPage} />
            <Route path="/pages/:page" component={CustomPage} />
            <Route component={Error404Page} />
          </Switch>
        </>
      )}
      <Footer />
      <CookiesModal />
    </SnackbarProvider>
  );
}

export default App;
