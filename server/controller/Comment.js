const Comment = require("../modals/Comment");
const Poll = require('../modals/Poll');
const mongoose = require('mongoose');
const User = require("../modals/user");

const getComments = async (req, res) => {
    try {
        const postId = req.params.postId;        
        if (!mongoose.Types.ObjectId.isValid(postId)) return res.status(404).send(`No post with id: ${postId}`);

        const details = await Poll.findOne({ _id: postId })
            .populate(
                {
                    path: "comments",
                    model: "Commentdoubthelper",
                },
            )
        if (details) return res.status(200).send(details.comments);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const createComment = async (req, res) => {
    try {
        const body = req.body;
        if(body.value && body.value.length>500)return res.status(400).send({"message":"Character limit exceed."})
        const postId = req.params.postId;        
        if (!mongoose.Types.ObjectId.isValid(postId)) return res.status(404).send(`No post with id: ${postId}`);
        const userDetail = await User.findOne({ _id: req.userId });
        const newComment = new Comment({
            ...body,
            name: userDetail.name,
            user: req.userId,
            createdAt: new Date().toISOString()
        });
        await newComment.save();
        const pollData = await Poll.findOne({_id:postId})
        if (pollData) pollData.comments.push(newComment._id);
        else {return res.status(500).send({ message: "Something went wrong" });}
        await pollData.save();
        return res.status(200).send(newComment);

    } catch (error) {        
        res.status(409).json({ message: error.message });
    }
}

const deleteComment = async (req, res) => {
    try {
        const { postId, commentId } = req.params;

        if (!mongoose.Types.ObjectId.isValid({ id: postId })) return res.status(404).send(`No post with id: ${postId}`);
        if (!mongoose.Types.ObjectId.isValid({ id: commentId })) return res.status(404).send(`No comment with id: ${commentId}`);

        const commenterData = await Comment.findOne({ _id: commentId });
        if (commenterData && (String(commenterData.user._id) === req.userId)) {
            await Poll.findOneAndUpdate(
                { _id: space },
                { $pull: { comments: commentId } },
                { new: true },)
            await Comment.findByIdAndRemove({ _id: commentId });
            res.status(200).json({ message: "Comment deleted successfully." });
        }
        else return res.status(400).send({ message: "Not authorized." })

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Something wrong happened" })
    }
}
module.exports = { getComments, createComment, deleteComment };


