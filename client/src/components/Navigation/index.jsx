import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom"; 
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { Help, Home } from "@material-ui/icons";
import MenuIcon from "@material-ui/icons/Menu";

import { useStyles } from "./styles";
import { navigation } from "./constants";

export function Navigation() {
  const classes = useStyles();
  const [drawerState, setDrawerState] = useState(false);
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawerState(open);
  };

  const list = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <RouterLink to="/" className={classes.menuItem}>
          <ListItem button key="Home">
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary={navigation.Home.link} />
          </ListItem>
        </RouterLink>
        <RouterLink to="/account" className={classes.menuItem}>
          <ListItem button key="Account">
            <ListItemIcon>
              <Help />
            </ListItemIcon>
            <ListItemText primary={navigation.Account.link} />
          </ListItem>
        </RouterLink>
      </List>
    </div>
  );

  return (
    <>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer(true)}
      >
        <MenuIcon />
      </IconButton>
      <Drawer anchor="left" open={drawerState} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </>
  );
}
