import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  cookiesWrapper: {
    display: "flex",
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.background.paper,
    borderTop: `1px solid ${theme.palette.divider}`,
    position: "fixed",
    bottom: 0,
    padding: theme.spacing(1),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
  },
  link: {
    color: theme.palette.background.paper,
  },
  button: {
    marginLeft: theme.spacing(2),
  },
}));
