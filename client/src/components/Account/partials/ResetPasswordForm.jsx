import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Container, TextField, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";

import { resetPassword, resetPasswordConfirm, setError } from "../accountSlice";
import { useStyles } from "../styles";

export function ResetPasswordForm(props) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const history = useHistory();

  const [tokenSent, setTokenSent] = useState(false);
  const { token } = props;

  const isError = useSelector((state) => state.account.error);
  const errorMessage = useSelector((state) => state.account.errorMessage);

  async function formHandler(e) {
    e.preventDefault();
    const form = e.target;
    if (token) {
      const password = form.password.value;
      const result = await dispatch(resetPasswordConfirm({ password, token }));
      if (result) {
        enqueueSnackbar("Please use new credentials.", {
          variant: "info",
        });
        history.push("/login");
      }
    } else {
      const email = form.email.value.trim();
      const result = await dispatch(resetPassword(email));
      if (result) {
        enqueueSnackbar("Check your email.", {
          variant: "info",
        });
        setTokenSent(true);
      }
    }
  }

  function clearError() {
    dispatch(setError({ error: false, errorMessage: "" }));
  }

  return (
    <Container component="main" maxWidth="xs" className={classes.formWrapper}>
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Reset Password
        </Typography>
        {isError && (
          <Typography component="div">
            {errorMessage && errorMessage.detail}
          </Typography>
        )}
        {tokenSent ? (
          <Typography>Check your email and follow instructions.</Typography>
        ) : (
          <form className={classes.form} noValidate onSubmit={formHandler}>
            {token ? (
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="New Password"
                type="password"
                id="password"
                autoComplete=""
                autoFocus
                error={!!errorMessage?.password}
                helperText={errorMessage?.password}
                onFocus={clearError}
              />
            ) : (
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="User Email"
                name="email"
                autoFocus
                error={!!errorMessage?.email?.length}
                helperText={errorMessage?.email}
                onFocus={clearError}
              />
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Reset password
            </Button>
          </form>
        )}
      </div>
    </Container>
  );
}
