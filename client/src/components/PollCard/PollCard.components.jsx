import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Container,
  Grid,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { likePostsAsync } from "../../store/Post/post.action";
import useStyles from "./PollCard.styles";
import { deletePostsAsync } from "../../store/Post/post.action";
import PollCardOption from "./PollCardOption/PollCardOption.components";
import PollCardAction from "./PollCardActions/PollCardAction.components";
import { selectRoomData } from "../../store/Post/post.selector";
import { selectCurrentSpace } from "../../store/DisscusionSpace/DS.selector";
import { selectCurrentUser } from "../../store/Auth/Auth.selector";
import { useNavigate } from "react-router-dom";

function PollCard({ currentPost, index }) {
  const classes = useStyles();
  const navigate = useNavigate();
  const [votes, setsVotes] = useState({ voteCnt: {}, selected: null });
  const dispatch = useDispatch();
  const roomData = useSelector(selectRoomData);
  const currentSpace = useSelector(selectCurrentSpace);
  const [showVoters, setShowVoters] = useState(false);
  const userId = useSelector(selectCurrentUser);

  const onDelete = async () => {
    dispatch(deletePostsAsync(currentPost._id, currentSpace, roomData));
  };
  const onComment = async () => {
    navigate(`/comment/${currentPost._id}`)
  };

  useEffect(() => {
    let voteObj = {};
    let ticked = null;
    currentPost.votes.forEach((vote) => {
      if (voteObj[`${vote.optionId}`]) voteObj[`${vote.optionId}`] += 1;
      else voteObj[`${vote.optionId}`] = 1;
      if (vote.user._id === userId._id) {
        ticked = vote.optionId;
      }
    });
    setsVotes({ voteCnt: voteObj, selected: ticked });
  }, [currentPost, userId]);

  const handleUpvote = (optionId) => {
    dispatch(likePostsAsync(currentPost._id, optionId, roomData));
  };

  //on first fetch we have populated
  return (
    <Card className={classes.root}>
      <Container maxWidth="xl">
        <CardContent>
          <div className={classes.imageContainer}>
            {currentPost.selectedFile &&
              currentPost.selectedFile.length > 1 && (
                <img
                  className={classes.media}
                  alt={` by ${currentPost.user}`}
                  src={currentPost.selectedFile}
                />
              )}
          </div>
          <Typography className={classes.question} variant="h5" component="h2">
            {index + 1}
            {". "} {currentPost.question}
            <Typography component="span" variant="body2">
              {"-"} {currentPost.user.name}
            </Typography>
          </Typography>
          <Grid container spacing={2}>
            {currentPost.options.map((option) => (
              <Grid item key={option._id} xs={12}>
                <PollCardOption
                  votes={votes}
                  option={option}
                  handleUpvote={handleUpvote}
                  setShowVoters={setShowVoters}
                  showVoters={showVoters}
                  currentPostVotes={currentPost.votes}
                />
              </Grid>
            ))}
          </Grid>
        </CardContent>
        <PollCardAction
          onComment={onComment}
          onDelete={onDelete}
          currentPostUserId={currentPost.user._id}
          userId={userId._id}
          createdAt={currentPost.createdAt}
        />
      </Container>
    </Card>
  );
}

export default PollCard;
