import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {Accordion, AccordionDetails, AccordionSummary} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const comments = [
  {
    _id: 1,
    value: "This is a great idea!",
    user: "John Doe",
    createdAt: "2022-07-01",
  },
  {
    _id: 2,
    value: "I disagree with this approach.",
    user: "Jane Doe",
    createdAt: "2022-07-02",
  },
  {
    _id: 3,
    value: "Can you explain your reasoning?",
    user: "John Doe",
    createdAt: "2022-07-03",
  },
  {
    _id: 4,
    value: "Sure, I'll elaborate in the next comment.",
    user: "Jane Doe",
    createdAt: "2022-07-04",
  },
];

const CommentPanel = () => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>
      <Button onClick={handleChange("panel1")}>Comment</Button>
      <Accordion
        // expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
        //   expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Comment</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {comments.map((comment) => (
            <Typography key={comment._id}>{comment.value}</Typography>
          ))}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default CommentPanel;
