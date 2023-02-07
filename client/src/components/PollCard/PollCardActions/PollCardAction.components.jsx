import React from "react";
import { CardActions, Button ,Typography} from "@material-ui/core";
import useStyles from './PollCart.styles';

const PollCardAction = (props) => {
  const {onComment,onDelete,currentPostUserId,userId,createdAt} = props;
  const classes = useStyles();

  return (
    <div className={classes.cartAction}>
      <CardActions>
        <Button
          size="small"
          color="primary"
          variant="contained"
          onClick={() => onComment()}
        >
          Comment
        </Button>
        <Button
          size="small"
          disabled={currentPostUserId === userId ? false : true}
          color="secondary"
          variant="contained"
          onClick={() => onDelete()}
        >
          Delete
        </Button>
      </CardActions>
      <Typography component="span" variant="body2">
        {`${new Date(createdAt).toLocaleString()}`}
      </Typography>
    </div>
  );
};

export default PollCardAction;
