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
  const errorMessage = useSelector((state) => state.account.errorMessage);

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
    dispatch(setError({ error: false, errorMessage: "" }));
  }

  return (
    <Container component="main" maxWidth="xs" className={classes.formWrapper}>
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        {isError && (
          <Typography component="div">
            {errorMessage && errorMessage.detail}
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
            autoFocus
            error={!!errorMessage?.username}
            helperText={errorMessage?.username}
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
            error={!!errorMessage?.password}
            helperText={errorMessage?.password}
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
        <Typography component="div">
          Forgot password? <Link to="/reset-password">Reset</Link>.
        </Typography>
      </div>
    </Container>
  );
}
