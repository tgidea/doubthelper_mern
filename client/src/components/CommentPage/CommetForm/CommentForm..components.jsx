import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { createCommentAsync } from "../../../store/Comment/Comment.action";
import {
  selectIsLoadingCreate,
  selectIsLoadingFetch,
} from "../../../store/Comment/Comment.selector";
import useStyles from "./CommetForm..styles";

const CommentForm = ({ postId, commentArray }) => {
  const classes = useStyles();
  const [value, setValue] = useState("");
  const isLoadingFetch = useSelector(selectIsLoadingFetch);
  const isLoadingCreate = useSelector(selectIsLoadingCreate);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createCommentAsync(postId, { value: value }, commentArray));
    setValue("");
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <TextField
        className={classes.textField}
        value={value}
        onChange={(e) => {
            if(e.target.value.length>500){
                window.alert("message limit is 500 characters only.")
            }
            else  setValue(e.target.value);
        }}
        placeholder="Leave a comment"
        variant="outlined"
      />
      <Button
        type="submit"
        className={classes.submitButton}
        variant="contained"
        color="primary"
        disabled={isLoadingFetch || isLoadingCreate}
      >
        Submit
      </Button>
    </form>
  );
};
export default CommentForm;
