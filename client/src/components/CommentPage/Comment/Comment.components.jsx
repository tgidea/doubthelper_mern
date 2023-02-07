import {
  Card,
  CardHeader,
  Avatar,
  Typography,
  Container,
} from "@material-ui/core";
import useStyles from './Comment.styles';


const Comment = ({ comment }) => {
  const user = comment.name;
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={<Avatar>{user[0]}</Avatar>}
        title={user}
        subheader={new Date(comment.createdAt).toLocaleString()}
      />
      <Container>
        <Typography variant="h5">{comment.value}</Typography>
      </Container>
    </Card>
  );
};

export default Comment;
