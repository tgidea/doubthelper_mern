import React, { useEffect } from "react";
import { Container } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCommentAsync } from "../../store/Comment/Comment.action";
import { selectCommentArray } from "../../store/Comment/Comment.selector";
import CommentForm from "./CommetForm/CommentForm..components";
import CommentList from "./CommentList/CommetList.components";

const CommentPage = () => {
  const { postId } = useParams();
  const commentArray = useSelector(selectCommentArray);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCommentAsync(postId));
  }, [postId, dispatch]);

  return (
    <Container maxWidth="xl">
      {postId && (
        <>
          {commentArray && commentArray.length && (
            <CommentList comments={commentArray} />
          )}
          <CommentForm postId={postId} commentArray={commentArray}/>
        </>
      )}
    </Container>
  );
};

export default CommentPage;
