import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  footerWrapper: {
    backgroundColor: theme.palette.background.default,
    borderTop: `1px solid ${theme.palette.divider}`,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    position: "fixed",
    bottom: 0,
    left: 0,
  },
  footer: {
    display: "flex",
    justifyContent: "center",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
}));
