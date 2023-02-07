import Comment from "../Comment/Comment.components";
import useStyles from './Comments.styles';

const CommentList = ({ comments }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {comments.map((comment) => (
        <Comment key={comment._id} comment={comment} />
      ))}
    </div>
  );
};
export default CommentList;
