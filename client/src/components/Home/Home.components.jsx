import React from "react";
import Grid from "@material-ui/core/Grid";
import Form from "../Form/Form.components";
import Description from "../Description/Description.components";
import useStyles from './Home.styles';

export default function HomePage() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Description />
          <Form />
        </Grid>
      </Grid>
      {/* <Footer className={classes.footer}>
        <Typography variant="body1">Footer</Typography>
      </Footer> */}
    </div>
  );
}
