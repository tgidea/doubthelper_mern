import React, { useEffect } from "react";
import { CircularProgress, Container } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCommentAsync } from "../../store/Comment/Comment.action";
import { selectCommentArray } from "../../store/Comment/Comment.selector";
import CommentForm from "./CommetForm/CommentForm..components";
import CommentList from "./CommentList/CommetList.components";
import { selectIsLoadingFetch } from "../../store/Comment/Comment.selector";

const CommentPage = () => {
  const { postId } = useParams();
  const commentArray = useSelector(selectCommentArray);
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoadingFetch);

  useEffect(() => {
    dispatch(fetchCommentAsync(postId));
  }, [postId, dispatch]);

  return (
    <Container maxWidth="xl">
      {postId && (
        <>
          {!isLoading ? (
            commentArray.length === 0 ? (
              "Empty"
            ) : (
              <CommentList comments={commentArray} />
            )
          ) : (
            <CircularProgress />
          )}
          <CommentForm postId={postId} commentArray={commentArray} />
        </>
      )}
    </Container>
  );
};

export default CommentPage;
