import React from "react";
import { useNavigate } from "react-router-dom";
import decode from "jwt-decode";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import { signUpUserGoogleAsync } from "../../store/Auth/Auth.action";
import { useState, useEffect } from "react";
import useStyles from "./Navbar.styles";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signOutUserAsync } from "../../store/Auth/Auth.action";
import { selectCurrentUser } from "../../store/Auth/Auth.selector";

const Navbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const user = useSelector(selectCurrentUser);

  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("profile"));
    if (profile && profile.credential) {
      dispatch(signUpUserGoogleAsync(profile.credential));
    }
  }, [dispatch]);

  const logout = () => {
    dispatch(signOutUserAsync());
    setCurrentUser(null);
    navigate("/");
  };

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("profile"));
    if (profile && profile.credential) {
      const decodedToken = decode(profile.credential);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        dispatch(signOutUserAsync());
        setCurrentUser(null);
        navigate("/");
      }
    }
  }, [location, dispatch, navigate]);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            DoubtHelper
          </Typography>
          <Toolbar className={classes.toolbar}>
            {currentUser ? (
              <div className={classes.profile}>
                <Avatar className={classes.purple} alt={currentUser.name}>
                  {currentUser?.name.charAt(0)}
                </Avatar>
                <Button
                  size="small"
                  variant="contained"
                  className={classes.logout}
                  color="secondary"
                  onClick={logout}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Button
                component={Link}
                to="/auth"
                variant="contained"
                color="primary"
              >
                Sign In
              </Button>
            )}
          </Toolbar>
        </Toolbar>
      </AppBar>
      <Outlet />
    </div>
  );
};

export default Navbar;
