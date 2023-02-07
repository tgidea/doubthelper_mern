import { makeStyles } from '@material-ui/core/styles';
export default makeStyles((theme) => ({
    root: {
      width: "100%",
    },
    cardHeader: {
      padding: theme.spacing(1, 2),
    },
    form: {
      display: "flex",
      alignItems: "center",
      marginTop: theme.spacing(2),
      padding: theme.spacing(1, 2),
      position: "fixed",
      bottom: 0,
      width: "87%",
      background: "white",
    },
    textField: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    submitButton: {
      marginLeft: theme.spacing(1),
    },
  }));