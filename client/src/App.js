import React from "react";
import { useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { SnackbarProvider } from "notistack";

import { HomePage } from "./pages/Home";
import { AccountPage } from "./pages/Account";
import { Error404Page } from "./pages/Error";

import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Spinner } from "./components/Spinner";

function App() {
  const isUserInitialized = useSelector(
    (state) => state.account.isUserInitialized
  );

  return (
    <SnackbarProvider maxSnack={3}>
      <Spinner />
      {isUserInitialized && (
        <>
          <Header />
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/login" component={AccountPage} />
            <Route path="/register" component={AccountPage} />
            <Route path="/dashboard" component={AccountPage} />
            <Route component={Error404Page} />
          </Switch>
        </>
      )}
      <Footer />
    </SnackbarProvider>
  );
}

export default App;
