import React, { useState } from "react";
import NewPollForm from "../PollForm/PollForm.components";
import { CircularProgress } from "@material-ui/core";
import { selectCurrentSpace } from "../../store/DisscusionSpace/DS.selector";
import { fetchPostsAsync } from "../../store/Post/post.action";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { selectRoomData } from "../../store/Post/post.selector";
import PollCards from "../PollCardContainer/pollCardContainer.compnents";
import { selectCurrentUser } from "../../store/Auth/Auth.selector";

const Room = () => {
  let currentSpace = useSelector(selectCurrentSpace);
  const dispatch = useDispatch();
  const roomData = useSelector(selectRoomData);
  const user = useSelector(selectCurrentUser);
  const [userId, setUser] = useState(user);

  useEffect(() => {
    dispatch(fetchPostsAsync(currentSpace));
  }, [currentSpace, dispatch]);

  useEffect(() => {
    if (user) setUser(user._id);
  }, [user]);

  return (
    <div>
      <NewPollForm />      
      {userId ? (
        roomData && roomData.posts ? (
          roomData.posts.length === 0 ? (
            "Empty"
          ) : (
            <div>                           
              <PollCards />
            </div>
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
