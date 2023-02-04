import React from "react";
import Grid from "@material-ui/core/Grid";
import PollCard from "../PollCard/PollCard.components";
import { useSelector } from "react-redux";
import { selectCurrentSpace } from "../../store/DisscusionSpace/DS.selector";
import { selectRoomData } from "../../store/Post/post.selector";
import useStyles from './pollCardContainer.styles';
import { selectCurrentUser } from "../../store/Auth/Auth.selector";


const PollCardContainer = () => {
  const classes = useStyles();
  const roomData = useSelector(selectRoomData);
  const discussionSpace = useSelector(selectCurrentSpace);  
  const userId = useSelector(selectCurrentUser) ;

  return (
    <div className={classes.root}>
      { userId && roomData.posts && discussionSpace && discussionSpace.length &&
        <Grid container spacing={1}>
          {roomData.posts.map((postData, index) => (
          <Grid item xs={12} key={postData._id}>
            <PollCard currentPost={postData} index={index}/>
          </Grid>
        ))}
        </Grid>
      }
    </div>
  );
};

export default PollCardContainer;
