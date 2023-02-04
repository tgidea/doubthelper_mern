import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Paper,
  Collapse,
  List,
  ListItemText,
  ListItem,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "./Form.styles";
import { useNavigate } from "react-router-dom";
import { selectCurrentUser } from "../../store/Auth/Auth.selector";
import {
  setCurrentSpaceAsync,
  createSpaceAsync,
} from "../../store/DisscusionSpace/DS.action";
import { selectSpaceArray } from "../../store/DisscusionSpace/DS.selector";

const Form = () => {
  const user = useSelector(selectCurrentUser);
  const [currentspace, setCurrentSpace] = useState("");
  const discussSpaceArray = useSelector(selectSpaceArray);
  const [spaceArray, setSpaceArray] = useState(discussSpaceArray);
  const [currentUser, setCurrentUser] = useState(user);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

  useEffect(() => {
    setSpaceArray(discussSpaceArray);
  }, [discussSpaceArray]);

  const createSpace = async (e) => {
    dispatch(createSpaceAsync());
    setOpen(!open);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentspace.length > 0) {
      dispatch(setCurrentSpaceAsync(currentspace));
      navigate("/room");
    }
  };

  return (
    <Paper className={classes.paper}>
      <Container maxWidth="sm">
        <form
          autoComplete="off"
          noValidate
          className={`${classes.root} ${classes.form}`}
          onSubmit={handleSubmit}
        >
          <Typography variant="h6">Join Discussion Space</Typography>
          <TextField
            name="space"
            variant="outlined"
            label="space"
            fullWidth
            value={currentspace}
            onChange={(e) => setCurrentSpace(e.target.value)}
          />
          <Button
            className={classes.buttonSubmit}
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            disabled={currentUser ? false : true}
            fullWidth
          >
            Join Discussion Space
          </Button>
        </form>

        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          onClick={() => createSpace()}
          disabled={currentUser ? false : true}
          fullWidth
        >
          Your Discussion Space
        </Button>
        {open && (
          <Collapse in>
            {spaceArray.map((space, index) => (
              <List key={index} className={classes.list}>
                <ListItem button onClick={() => {setCurrentSpace(space)}}>
                  <ListItemText primary={space} />
                </ListItem>
              </List>
            ))}
          </Collapse>
        )}
      </Container>
    </Paper>
  );
};

export default Form;