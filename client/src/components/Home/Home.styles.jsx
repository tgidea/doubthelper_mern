import { makeStyles } from "@material-ui/core/styles";
export default makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
    list: {
      backgroundColor: theme.palette.background.paper,
      width: "100%",
      position: "relative",
      overflow: "auto",
      maxHeight: "50vh",
    },
    footer: {
      bottom: 0,
      // width: "100%",
      // position: "fixed",
      padding: theme.spacing(2),
    },
  }));