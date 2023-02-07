import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signUpUserGoogleAsync } from './store/Auth/Auth.action';
import Navbar from './components/Navbar/Navbar.components';
import Home from './components/Home/Home.components';
import Auth from './components/Auth/Auth.components';
import Room from './components/Room/Room.components';
import { selectCurrentUser } from './store/Auth/Auth.selector';
import { CircularProgress } from '@material-ui/core';
import useStyles from './App.styles';
import CommentPage from './components/CommentPage/CommentPage.components';

const App = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const [showComponent, setShowComponent] = useState(false);

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("profile"));
    if (user) {
      setShowComponent(true);
    }
    if (!user && profile && profile.credential) {
      setShowComponent(false);
      dispatch(signUpUserGoogleAsync(profile.credential));
    } else {
      setShowComponent(true);
    }
  }, [user, dispatch]);

  return (
    < Routes >
      <Route path="/" element={
        showComponent ? <Navbar />
          :
          <div className={classes.initial}>
            {" "}
            <CircularProgress />
            {"Please wait few seconds..."}
          </div>
      }>
        <Route index element={<Home />}></Route>
        <Route path="auth" element={<Auth />}></Route>
        <Route path="room" element={<Room />}></Route>
        <Route path="comment/:postId" element={<CommentPage />}>

        </Route>
        <Route path=":space" element={<Home />}></Route>
      </Route>
    </Routes>
  );
};

export default App;
