import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Container,
  Button,
  Grid,
} from "@material-ui/core";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import { useDispatch, useSelector } from "react-redux";
import { likePostsAsync } from "../../store/Post/post.action";
import useStyles from "./PollCard.styles";
import { deletePostsAsync } from "../../store/Post/post.action";
// import CommentPanel from '../Comments/Comments.components';
import { selectPosts } from "../../store/Post/post.selector";
import { selectCurrentSpace } from "../../store/DisscusionSpace/DS.selector";
import { selectCurrentUser } from "../../store/Auth/Auth.selector";

function PollCard({ currentPost}) {
  const classes = useStyles();
  const [votes, setsVotes] = useState({ voteCnt: {}, selected: null });
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);
  const currentSpace = useSelector(selectCurrentSpace);
  const userId = useSelector(selectCurrentUser);

  const onDelete = async () => {
    dispatch(deletePostsAsync(currentPost._id, currentSpace, posts));
  };
  const onComment = async () => {};

  useEffect(() => {
    let voteObj = {};
    let ticked = null;
    currentPost.votes.forEach((vote) => {
      if (voteObj[`${vote.optionId}`]) voteObj[`${vote.optionId}`] += 1;
      else voteObj[`${vote.optionId}`] = 1;
      if (vote.user === userId._id) {
        ticked = vote.optionId;
      }
    });
    setsVotes({ voteCnt: voteObj, selected: ticked });
  }, [currentPost, userId]);

  const handleUpvote = (optionId) => {
    dispatch(likePostsAsync(currentPost._id, optionId, posts));
  };
  return (
    <Card className={classes.root}>
      <Container maxWidth="xl">
        <CardContent>
          <div className={classes.imageContainer}>
            {currentPost.selectedFile &&
              currentPost.selectedFile.length > 1 && (
                <img
                  className={classes.media}
                  alt={` by ${currentPost.user.name}`}
                  src={currentPost.selectedFile}
                />
              )}
          </div>
          <Typography className={classes.question} variant="h5" component="h2">
            {currentPost.question}
          </Typography>
          <Grid container spacing={2}>
            {currentPost.options.map((option) => (
              <Grid item key={option._id} xs={12}>
                <div className={classes.option}>
                  <IconButton onClick={() => handleUpvote(option._id)}>
                    <ThumbUpIcon
                      color={
                        votes.selected === option._id ? "primary" : "inherit"
                      }
                    />
                  </IconButton>
                  <Typography className={classes.optionText} variant="body2">
                    {option.option}
                  </Typography>
                  <Typography className={classes.upvoteCount} variant="body2">
                    {votes.voteCnt[`${option._id}`]
                      ? votes.voteCnt[`${option._id}`]
                      : 0}{" "}
                    votes
                  </Typography>
                </div>
              </Grid>
            ))}
          </Grid>
        </CardContent>
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
            disabled = {!(currentPost.user._id === userId._id)}
            color="secondary"
            variant="contained"
            onClick={() => onDelete()}
            >
            Delete
          </Button>
        </CardActions>
          {/* <CommentPanel></CommentPanel> */}
      </Container>
    </Card>
  );
}

export default PollCard;
