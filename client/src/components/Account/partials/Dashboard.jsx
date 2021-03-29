import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Container, Typography } from "@material-ui/core";

import { Footer } from "../../Footer";
import { useStyles } from "../styles";

export function Dashboard() {
  const history = useHistory();
  const classes = useStyles();
  const user = useSelector((state) => state.account.user);
  const isLoggedIn = useSelector((state) => state.account.isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      history.push("/login");
    }
  }, [history, isLoggedIn]);

  return user ? (
    <>
      <Container maxWidth="sm" className={classes.offset}>
        <Typography component="h1" variant="h5">
          Dashboard
        </Typography>
        <Typography component="p">Username: {user.username}</Typography>
        <Typography component="p">Email: {user.email}</Typography>
        <Typography component="p">First Name: {user.first_name}</Typography>
        <Typography component="p">Last Name: {user.last_name}</Typography>
      </Container>
      <Footer />
    </>
  ) : (
    <>No data</>
  );
}
