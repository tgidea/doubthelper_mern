import React from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import useStyles from './Description.style';


export default function Description() {
  const classes = useStyles();
  return (
    <Grid item xs={12}>
      <Paper className={classes.paper}>
        <Typography className={classes.head}  variant="h4">Doubt Helper</Typography>
        <Typography variant="body1">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis, ratione fugiat cum quo nemo consequuntur nisi a consequatur sunt enim labore culpa quis voluptates quae error aperiam vitae aspernatur atque fuga amet quia ad!
        </Typography>
      </Paper>
    </Grid>
  );
}
