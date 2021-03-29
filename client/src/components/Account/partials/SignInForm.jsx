import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Container, TextField, Typography } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";

import { signIn, setError } from "../accountSlice";
import { useStyles } from "../styles";

export function SignInForm() {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const classes = useStyles();

  const isUserLoggedIn = useSelector((state) => state.account.isLoggedIn);
  const isError = useSelector((state) => state.account.error);

  useEffect(() => {
    if (isUserLoggedIn) {
      history.push("/dashboard");
    }
  }, [history, isUserLoggedIn]);

  async function formHandler(e) {
    e.preventDefault();
    const form = e.target;
    const username = form.username.value.trim();
    const password = form.password.value;
    const result = await dispatch(signIn({ username, password }));
    if (result) {
      enqueueSnackbar("You are logged in.", {
        variant: "info",
      });
    }
  }

  function clearError() {
    dispatch(setError(false));
  }

  return (
    <Container component="main" maxWidth="xs" className={classes.formWrapper}>
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        {isError && (
          <Typography component="div">
            Login or password is incorrect.
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
            Sign In
          </Button>
        </form>
        <Typography component="div">
          Have no account? <Link to="/register">Register</Link>.
        </Typography>
      </div>
    </Container>
  );
}
