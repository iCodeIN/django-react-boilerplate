import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { Container } from "@material-ui/core";

import { SignInForm } from "../../components/Account/partials/SignInForm";
import { ResetPasswordForm } from "../../components/Account/partials/ResetPasswordForm";
import { Dashboard } from "../../components/Account/partials/Dashboard";
import { SignUpForm } from "../../components/Account/partials/SignUpForm";
import { navigation } from "../../components/Navigation/constants";
import { updatePageTitle } from "../../components/Navigation/navigationSlice";
import { useStyles } from "./styles";

export function AccountPage(props) {
  const { location } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(updatePageTitle(navigation.Account.title));
  });

  let mainContainer = null;
  const searchQuery = new URLSearchParams(useLocation().search);

  switch (true) {
    case /login/.test(location.pathname):
      mainContainer = <SignInForm />;
      break;
    case /register/.test(location.pathname):
      mainContainer = <SignUpForm />;
      break;
    case /reset-password/.test(location.pathname):
      const token = searchQuery.get("token");
      mainContainer = <ResetPasswordForm token={token} />;
      break;
    case /dashboard/.test(location.pathname):
      mainContainer = <Dashboard />;
      break;
    default:
      history.push("/");
      break;
  }

  return (
    <Container maxWidth="sm" className={classes.offset}>
      {mainContainer}
    </Container>
  );
}
