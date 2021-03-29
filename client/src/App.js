import React from "react";
import { Switch, Route } from "react-router-dom";
import { SnackbarProvider } from "notistack";

import { HomePage } from "./pages/Home";
import { AccountPage } from "./pages/Account";

import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Spinner } from "./components/Spinner";

function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <Spinner />
      <Header />
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/login" component={AccountPage} />
        <Route path="/register" component={AccountPage} />
        <Route path="/dashboard" component={AccountPage} />
      </Switch>
      <Footer />
    </SnackbarProvider>
  );
}

export default App;
