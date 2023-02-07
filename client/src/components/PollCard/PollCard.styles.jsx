import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
  },
  question: {
    display: "flex",
    justifyContent : "space-between",
    fontWeight: "bold",
    marginBottom: theme.spacing(1),
  },
  media: {
    maxHeight:"250px",
    maxWidth : "250px"
  },
  imageContainer :{
    display  : "flex",
    justifyContent : "center"
  }
}));
