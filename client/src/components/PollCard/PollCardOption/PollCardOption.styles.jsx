import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  option: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(0.1),
  },
  optionText: {
    marginLeft: theme.spacing(0, 1),
  },
  upvoteCount: {
    marginLeft: "auto",
  },
}));
