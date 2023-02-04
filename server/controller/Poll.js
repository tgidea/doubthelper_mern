const Poll = require("../modals/Poll");
const Room = require('../modals/Room');
const mongoose = require('mongoose');

const getPosts = async (req, res) => {
    try {
        const id = req.params.space;
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

        Room.findOne({ _id: id })
            .populate({
                path: 'user',
                model: 'Userdoubthelper',
                select: 'name email'
            })
            .populate({
                path: 'posts',
                populate: {
                    path: 'user',
                    model: 'Userdoubthelper',
                    select: 'name email'
                }
            })
            .exec(function (err, data) {
                if (err) {
                    console.log(err);
                    res.status(500).send({ message: "Something went wrong" });
                }
                res.status(200).send(data);
            });

    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
}
const createPosts = async (req, res) => {
    try {
        const body = req.body;
        const id = req.params.space;
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
        const newPost = new Poll({
            ...body,
            user: req.userId,
            votes: [],
            comments: [],
            createdAt: new Date().toISOString()
        });
        await newPost.save();
        const roomData = await Room.findOne({ _id: id })
        
        if(roomData)roomData.posts.push(newPost._id);
        else return res.status(500).send({message:"Something went wrong"});
        await roomData.save();
        res.status(201).json(newPost);
    } catch (error) {
        console.log(error);
        res.status(409).json({ message: error.message });
    }
}
const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, message, creator, selectedFile, tags } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

        // Remember to add _id
        const updatedPost = { creator, title, message, tags, selectedFile, _id: id };
        await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });
        res.json(updatedPost);
    }
    catch (error) {
        res.status(500).send({ message: "Something wrong happened" })
    }
}

const deletePost = async (req, res) => {
    try {
        const { postId, space } = req.params;

        if (!mongoose.Types.ObjectId.isValid({ id: postId })) return res.status(404).send(`No post with id: ${postId}`);
        const postUser = await Poll.findOne({ _id: postId });
        if (postUser && (String(postUser.user._id) === req.userId)) {
            Room.findOneAndUpdate(
                { _id: space },
                { $pull: { posts: postId } },
                { new: true },
                async(error, updatedPoll) => {
                    if (error) {
                        return res.status(500).send(error);
                    }
                    await Poll.findByIdAndRemove({ _id: postId });
                    res.status(200).json({ message: "Post deleted successfully." });
                }
            );            
        }
        else return res.status(400).send({ message: "Not authorized." })

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Something wrong happened" })
    }
}
const likePost = async (req, res) => {
    try {
        const { postId, optionId } = req.params;
        if (!req.userId) {
            return res.status(400).json({ message: "Unauthenticated" });
        }
        else if (!mongoose.Types.ObjectId.isValid(postId)) return res.status(404).send(`No post with id: ${postId}`);
        else {

            const post = await Poll.findOne({ _id: postId });
            let voteArray = post.votes;
            voteArray = voteArray.filter(vote => vote.user == req.userId);
            if (voteArray.length > 0) {
                if (voteArray[0].optionId == optionId) {
                    Poll.findOneAndUpdate(
                        { _id: postId },
                        { $pull: { votes: { user: req.userId } } },
                        { new: true },
                        (error, updatedPoll) => {
                            if (error) {
                                return res.status(500).send(error);
                            }
                            return res.status(200).send(updatedPoll);
                        }
                    );
                }
                else {
                    Poll.findOneAndUpdate(
                        { _id: postId, "votes.user": req.userId },
                        { $set: { "votes.$.optionId": optionId } },
                        { new: true, upsert: true },
                        (error, updatedPoll) => {
                            if (error) {
                                return res.status(500).send(error);
                            }
                            return res.status(200).send(updatedPoll);
                        })
                }
            }
            else {
                Poll.findOneAndUpdate(
                    { _id: postId },
                    { $push: { votes: { user: req.userId, optionId: optionId } } },
                    { new: true },
                    (error, updatedPoll) => {
                        if (error) {
                            return res.status(500).send(error);
                        }
                        return res.status(200).send(updatedPoll);
                    })
            }
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: "Something wrong happened" })
    }
}
module.exports = { getPosts, createPosts, updatePost, deletePost, likePost };

