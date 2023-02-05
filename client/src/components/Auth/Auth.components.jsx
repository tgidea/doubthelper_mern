import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  signInUserAsync,
  signUpUserAsync,
  signUpUserGoogleAsync,
} from "../../store/Auth/Auth.action";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
  CircularProgress,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { selectIsLoading } from "../../store/Auth/Auth.selector";
import useStyles from "./Auth.styles";
import Input from "./Input.comonents";
import { selectCurrentUser } from "../../store/Auth/Auth.selector";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUp = () => {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const user = useSelector(selectCurrentUser);
  const [waitToDisplayForm, setWaitToDisplayForm] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const isLoading = useSelector(selectIsLoading);
  const [isProcessing, setIsProcessing] = useState(isLoading);
  const [fetchingStart, setFetchingStart] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };
  useEffect(() => {
    setIsProcessing((prevState) => {
      if((prevState !== isLoading) && fetchingStart && !isLoading){
        setFetchingStart(false);
        navigate('/')
      }
      setIsProcessing(isLoading);
    });
  }, [isLoading, fetchingStart, navigate]);

  useEffect(() => {
    if (user) navigate("/");
    else setWaitToDisplayForm(false);
  }, [user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      dispatch(signUpUserAsync(form));
    } else {
      dispatch(signInUserAsync(form));
    }
    setFetchingStart(true);
  };
  const googleSuccess = async (response) => {
    try {
      dispatch(signUpUserGoogleAsync(response.credential));
      navigate("/");
    } catch (error) {}
  };
  const googleError = (error) => {
    alert("Google Sign In was unsuccessful. Try again later");
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <Container component="main" maxWidth="xs">
      {!waitToDisplayForm && (
        <Paper className={classes.paper} elevation={3}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {isSignup ? "Sign up" : "Sign in"}
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {isSignup && (
                <>
                  <Input
                    name="firstName"
                    label="First Name"
                    handleChange={handleChange}
                    autoFocus
                    half
                  />
                  <Input
                    name="lastName"
                    label="Last Name"
                    handleChange={handleChange}
                    half
                  />
                </>
              )}
              <Input
                name="email"
                label="Email Address"
                handleChange={handleChange}
                type="email"
              />
              <Input
                name="password"
                label="Password"
                handleChange={handleChange}
                type={showPassword ? "text" : "password"}
                handleShowPassword={handleShowPassword}
              />
              {isSignup && (
                <Input
                  name="confirmPassword"
                  label="Repeat Password"
                  handleChange={handleChange}
                  type="password"
                />
              )}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={isProcessing}
            >
              {isSignup ? "Sign Up" : "Sign In"}
              {isProcessing && (
                <CircularProgress
                  size={24}
                  className={classes.buttonProgress}
                />
              )}
            </Button>
            <Button fullWidth>
              <GoogleLogin onSuccess={googleSuccess} onError={googleError} />
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Button onClick={switchMode}>
                  {isSignup
                    ? "Already have an account? Sign in"
                    : "Don't have an account? Sign Up"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      )}
    </Container>
  );
};

export default SignUp;
