const router = require('express').Router();
const {getPosts, createPosts, deletePost, likePost, updatePost} = require('../controller/Poll');
const auth = require("../middleware/auth.js");

router.get('/:space', auth, getPosts);
router.post('/:space', auth , createPosts);
router.delete('/:postId/:space', auth,  deletePost);
router.patch('/:postId/likePost/:optionId', auth, likePost);
module.exports = router;