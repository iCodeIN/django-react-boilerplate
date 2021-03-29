import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(theme => ({
  menuButton: { color: theme.palette.background.paper },
  formWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 'calc(100vh - 141px)',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  offset: {
    marginTop: theme.spacing(7),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
}));
