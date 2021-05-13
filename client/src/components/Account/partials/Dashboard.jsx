import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, Container, TextField, Typography } from "@material-ui/core";
import { useSnackbar } from "notistack";

import { setError, updateUser } from "../accountSlice";
import { useStyles } from "../styles";

export function Dashboard() {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const classes = useStyles();
  const user = useSelector((state) => state.account.user);
  const isLoggedIn = useSelector((state) => state.account.isLoggedIn);
  const isError = useSelector((state) => state.account.error);
  const errorMessage = useSelector((state) => state.account.errorMessage);

  useEffect(() => {
    if (!isLoggedIn) {
      history.push("/login");
    }
  }, [history, isLoggedIn]);

  async function formHandler(e) {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value.trim();
    const password = form.password.value;
    const first_name = form.first_name.value.trim();
    const last_name = form.last_name.value.trim();
    const result = await dispatch(
      updateUser({ email, password, first_name, last_name })
    );
    if (result) {
      enqueueSnackbar("You data has been updated.", {
        variant: "info",
      });
    }
  }

  function clearError() {
    dispatch(setError({ error: false, errorMessage: "" }));
  }

  return user ? (
    <>
      <Container maxWidth="sm" className={classes.offset}>
        <Typography component="h1" variant="h5">
          Dashboard ({user.username})
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
              id="email"
              label="Email"
              name="email"
              error={!!errorMessage?.email?.length}
              helperText={errorMessage?.email}
              onFocus={clearError}
              defaultValue={user.email}
            />
          <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              type="password"
              id="password"
              label="Password"
              name="password"
              error={!!errorMessage?.password?.length}
              helperText={errorMessage?.password}
              onFocus={clearError}
            />
          <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="first_name"
              label="First Name"
              name="first_name"
              error={!!errorMessage?.first_name?.length}
              helperText={errorMessage?.first_name}
              onFocus={clearError}
              defaultValue={user.first_name}
            />
          <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="last_name"
              label="Last Name"
              name="last_name"
              error={!!errorMessage?.last_name?.length}
              helperText={errorMessage?.last_name}
              onFocus={clearError}
              defaultValue={user.last_name}
            />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Save
          </Button>
        </form>
      </Container>
    </>
  ) : (
    <>No data</>
  );
}
