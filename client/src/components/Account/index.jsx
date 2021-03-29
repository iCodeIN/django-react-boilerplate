import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Divider, IconButton, Menu, MenuItem } from "@material-ui/core";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { ExitToApp, AccountCircle } from "@material-ui/icons";
import { useSnackbar } from "notistack";

import { signOut } from "./accountSlice";
import { useStyles } from "./styles";

export function Account() {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const isLoggedIn = useSelector((state) => state.account.isLoggedIn);

  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  function logout() {
    dispatch(signOut());
    handleMenuClose();
    history.push("/login");
    enqueueSnackbar("You are logged out.", {
      variant: "info",
    });
  }

  function dashboard() {
    handleMenuClose();
    history.push("/dashboard");
  }

  const menuId = "account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={dashboard}>Dashboard</MenuItem>
      <Divider />
      <MenuItem onClick={logout}>Sign out</MenuItem>
    </Menu>
  );

  return isLoggedIn ? (
    <>
      <IconButton
        edge="end"
        aria-label="account of current user"
        aria-controls={menuId}
        aria-haspopup="true"
        onClick={handleProfileMenuOpen}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      {renderMenu}
    </>
  ) : (
    <IconButton
      edge="end"
      className={classes.menuButton}
      aria-label="login"
      component={RouterLink}
      to="/login"
    >
      <ExitToApp />
    </IconButton>
  );
}
