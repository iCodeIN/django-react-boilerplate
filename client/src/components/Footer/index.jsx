import React from "react";
import { useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";

import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import { useStyles } from "./styles";

export function Footer() {
  const classes = useStyles();
  const pagesList = useSelector((state) => state.customPage.pagesList);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <div className={classes.footerWrapper}>
      <nav className={classes.footerMenu}>
        <ul className={matches ? classes.menuList : classes.menuListSm}>
          {pagesList.map((menuItem) => (
            <li
              key={menuItem.url}
              className={matches ? classes.menuItem : classes.menuItemSm}
            >
              <RouterLink
                to={`/pages/${menuItem.url}`}
                className={classes.menuLink}
              >
                {menuItem.title}
              </RouterLink>
            </li>
          ))}
        </ul>
      </nav>
      <p className={classes.footerItem}>Acme Inc. &copy; MMXXI</p>
    </div>
  );
}
