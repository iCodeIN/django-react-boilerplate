import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  footerWrapper: {
    backgroundColor: theme.palette.background.default,
    borderTop: `1px solid ${theme.palette.divider}`,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    position: "fixed",
    flexDirection: "column",
    bottom: 0,
    left: 0,
  },
  footerItem: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  footerMenu: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  menuList: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    padding: 0,
    margin: 0,
  },
  menuListSm: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 0,
    margin: 0,
  },
  menuItem: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    listStyle: "none",
  },
  menuItemSm: {
    textAlign: "center",
    listStyle: "none",
  },
  menuLink: {
    color: theme.palette.text.secondary,
    textDecoration: "none",
  },
}));
