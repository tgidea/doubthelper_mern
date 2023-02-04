import React from "react";
import Grid from "@material-ui/core/Grid";
import PollCard from "../PollCard/PollCard.components";
import { useSelector } from "react-redux";
import { selectCurrentSpace } from "../../store/DisscusionSpace/DS.selector";
import { selectPosts } from "../../store/Post/post.selector";
import useStyles from './pollCardContainer.styles';
import { selectCurrentUser } from "../../store/Auth/Auth.selector";


const PollCardContainer = () => {
  const classes = useStyles();
  const pollArray = useSelector(selectPosts);
  const discussionSpace = useSelector(selectCurrentSpace);  
  const userId = useSelector(selectCurrentUser) ;

  return (
    <div className={classes.root}>
      { userId && pollArray.length>0 && discussionSpace && discussionSpace.length &&
        <Grid container spacing={1}>
          {pollArray[0].posts.map((postData) => (
          <Grid item xs={12} key={postData._id}>
            <PollCard currentPost={postData} />
          </Grid>
        ))}
        </Grid>
      }
    </div>
  );
};

export default PollCardContainer;
