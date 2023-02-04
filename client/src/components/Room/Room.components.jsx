import React, { useState } from "react";
import NewPollForm from "../PollForm/PollForm.components";
import { CircularProgress } from "@material-ui/core";
import { selectCurrentSpace } from "../../store/DisscusionSpace/DS.selector";
import { fetchPostsAsync } from "../../store/Post/post.action";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { selectPosts } from "../../store/Post/post.selector";
import PollCards from "../PollCardContainer/pollCardContainer.compnents";
import { selectCurrentUser } from "../../store/Auth/Auth.selector";

const Room = () => {
  const currentSpace = useSelector(selectCurrentSpace);
  const dispatch = useDispatch();
  const pollDatas = useSelector(selectPosts);
  const user = useSelector(selectCurrentUser);
  const [userId, setUser] = useState(user);
  const [pollArray, setpollArray] = useState(pollDatas);

  useEffect(() => {
    dispatch(fetchPostsAsync(currentSpace));
  }, [currentSpace, dispatch]);

  useEffect(() => {
    setpollArray(pollDatas);
  }, [pollDatas]);

  useEffect(() => {
    if (user) setUser(user._id);
  }, [user]);

  return (
    <div>
      <NewPollForm />
      {userId ? (
        pollArray && pollArray[0] ? (
          pollArray[0].posts.length === 0 ? (
            "Empty"
          ) : (
            <PollCards />
          )
        ) : (
          <CircularProgress />
        )
      ) : (
        "Please Sign In First"
      )}
    </div>
  );
};

export default Room;
