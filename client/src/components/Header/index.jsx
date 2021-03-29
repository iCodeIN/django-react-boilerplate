import React from "react";
import { useSelector } from "react-redux";
import { AppBar, Toolbar, Typography } from "@material-ui/core";

import { Account } from '../Account';
import { Navigation } from "../Navigation";
import { pageTitleValue } from "../Navigation/navigationSlice";
import { useStyles } from "./styles";

export function Header() {
  const classes = useStyles();
  const title = useSelector(pageTitleValue);

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Navigation />
        <Typography variant="h6" className={classes.title}>
          {title}
        </Typography>
        <Account />
      </Toolbar>
    </AppBar>
  );
}
