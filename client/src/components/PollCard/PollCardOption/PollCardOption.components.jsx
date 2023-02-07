import React from "react";
import {
  Typography,
  IconButton,
} from "@material-ui/core";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import useStyles from "./PollCardOption.styles";

const PollCardOption = (props) => {
  // console.log('pollcardoption')
    const {votes,option,handleUpvote,setShowVoters,showVoters,currentPostVotes} = props; 
    const classes = useStyles();
  return (
    <div className={classes.option}>
      <IconButton onClick={() => handleUpvote(option._id)}>
        <ThumbUpIcon
          color={votes.selected === option._id ? "primary" : "inherit"}
        />
      </IconButton>
      <Typography className={classes.optionText} variant="body1">
        {option.option}
      </Typography>
      <Typography
        component="div"
        className={classes.upvoteCount}
        variant="body2"
      >
        <span onClick={() => setShowVoters(!showVoters)}>
          {votes.voteCnt[`${option._id}`] ? votes.voteCnt[`${option._id}`] : 0}{" "}
          votes
        </span>
        {showVoters && (
          <div>
            {votes.voteCnt[`${option._id}`] && (
              <>
                {currentPostVotes
                  .filter((vote) => vote.optionId === option._id)
                  .map((vote) => (
                    <li key={vote._id}>{vote.user.name}</li>
                  ))}
              </>
            )}
          </div>
        )}
      </Typography>
    </div>
  );
};

export default PollCardOption;
