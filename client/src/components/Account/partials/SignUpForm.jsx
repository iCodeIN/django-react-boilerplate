import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Container, TextField, Typography } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";

import { signUp, setError } from "../accountSlice";
import { useStyles } from "../styles";

export function SignUpForm() {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const classes = useStyles();

  const isUserLoggedIn = useSelector((state) => state.account.isLoggedIn);
  const isError = useSelector((state) => state.account.error);

  useEffect(() => {
    if (isUserLoggedIn) {
      history.push("/dashboard");
      enqueueSnackbar("You are registered.", {
        variant: "info",
      });
    }
  }, [history, isUserLoggedIn, enqueueSnackbar]);

  function formHandler(e) {
    e.preventDefault();
    const form = e.target;
    const username = form.username.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;
    dispatch(signUp({ username, email, password }));
  }

  function clearError() {
    dispatch(setError(false));
  }

  return (
    <Container component="main" maxWidth="xs" className={classes.formWrapper}>
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        {isError && (
          <Typography component="div">
            Something went wrong.
          </Typography>
        )}
        <form className={classes.form} noValidate onSubmit={formHandler}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="User Name"
            name="username"
            autoComplete="username"
            autoFocus
            error={isError}
            onFocus={clearError}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            error={isError}
            onFocus={clearError}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            error={isError}
            onFocus={clearError}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
        </form>
        <Typography component="div">
          Have an account? <Link to="/login">Login</Link>.
        </Typography>
      </div>
    </Container>
  );
}
