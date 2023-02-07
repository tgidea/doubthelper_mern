const router = require('express').Router();
const {getComments, createComment, deleteComment} = require('../controller/Comment');
const auth = require("../middleware/auth.js");

router.get('/:postId', auth, getComments)
router.post('/:postId', auth,  createComment);
router.delete('/:postId/:commentId', auth, deleteComment);

module.exports = router;