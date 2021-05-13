import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";

import { Button, Paper, Typography } from "@material-ui/core";

import { setCookie } from "../../app/utils";
import { hideModal, setConfirmed } from "./cookiesConsentSlice";
import { useStyles } from "./styles";
import { termsPageUrl } from "../../app/constants";

export function CookiesModal() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.cookiesConsent.visible);

  const handleClose = () => {
    dispatch(hideModal());
    setCookie("accepted");
    dispatch(setConfirmed(true));
  };

  return isOpen ? (
    <Paper elevation={8} className={classes.cookiesWrapper}>
      <Typography component="p">
        By using this website, you automatically accept that we use cookies.{" "}
        <RouterLink to={termsPageUrl} className={classes.link}>
          What for?
        </RouterLink>
      </Typography>
      <Button
        onClick={handleClose}
        className={classes.button}
        variant="contained"
        color="primary"
      >
        Agree
      </Button>
    </Paper>
  ) : null;
}
