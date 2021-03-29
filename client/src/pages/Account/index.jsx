import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Container } from "@material-ui/core";

import { SignInForm } from "../../components/Account/partials/SignInForm";
import { Dashboard } from "../../components/Account/partials/Dashboard";
import { SignUpForm } from "../../components/Account/partials/SignUpForm";
import { navigation } from "../../components/Navigation/constants";
import { updatePageTitle } from "../../components/Navigation/navigationSlice";
import { useStyles } from "./styles";

export function AccountPage(props) {
  const { location } = props;
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updatePageTitle(navigation.Account.title));
  });

  let mainContainer = null;
  switch (location.pathname) {
    case "/login":
      mainContainer = <SignInForm />;
      break;
    case "/register":
      mainContainer = <SignUpForm />;
      break;
    case "/dashboard":
      mainContainer = <Dashboard />;
      break;
    default:
      break;
  }

  return (
    <Container maxWidth="sm" className={classes.offset}>
      {mainContainer}
    </Container>
  );
}
