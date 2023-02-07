const Poll = require("../modals/Poll");
const Room = require('../modals/Room');
const mongoose = require('mongoose');
const { populate } = require("../modals/user");

const getPosts = async (req, res) => {
    try {
        const id = req.params.space;
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

        Room.findOne({ _id: id })
            .populate([
                {
                    path: 'user',
                    model: 'Userdoubthelper',
                    select: 'name email'
                },
                {
                    path: "posts",
                    model: "Polldoubthelper",
                    populate: [
                        {
                            path: 'user',
                            model: 'Userdoubthelper',
                            select: 'name'
                        },
                        {
                            path: 'votes',
                            populate: {
                                path: 'user',
                                model: 'Userdoubthelper',
                                select: 'name'
                            }
                        }
                    ]
                }
            ])
            .exec(function (err, data) {
                if (err) {
                    console.log(err);
                    res.status(500).send({ message: "Something went wrong" });
                }
                res.status(200).send(data);
            });

    } catch (error) {
        // console.log(error);
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
        if (roomData) roomData.posts.push(newPost._id);
        else return res.status(500).send({ message: "Something went wrong" });
        await roomData.save();

        const populatedPoll = await Poll.findById(newPost._id)
            .populate([
                {
                    path: "user",
                    model: "Userdoubthelper",
                    select: 'name',
                },
                {
                    path: 'votes.user',
                    mode: "Userdoubthelper",
                    select: 'name',
                }
            ])
        return res.status(200).send(populatedPoll);
    } catch (error) {
        console.log(error);
        res.status(409).json({ message: error.message });
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
                async (error, updatedPoll) => {
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
        const { userId } = req;
        if (!userId) {
            return res.status(400).json({ message: "Unauthenticated" });
        }
        else if (!mongoose.Types.ObjectId.isValid(postId)) return res.status(404).send(`No post with id: ${postId}`);
        else {
            // user vote not present             
            const updatedPoll = await Poll.findOneAndUpdate({
                _id: postId, "votes.user": { $ne: userId }
            }, {
                $push: { votes: { user: userId, optionId: optionId } }
            },
                { upsert: false, new: true, }
            )            
            if (!updatedPoll) {                
                // user has already voted
                const newUpdatedPoll = await Poll.findOneAndUpdate({
                    _id: postId, "votes": {
                        $elemMatch: { "user": userId, "optionId": optionId }
                    }
                },
                    { $pull: { votes: { user: userId } } },
                    { new: true })
                if (!newUpdatedPoll) {
                    await Poll.findOneAndUpdate(
                        { _id: postId, "votes.user": userId },
                        { $set: { "votes.$.optionId": optionId } }, { new: true })
                }
            }
            // populating the poll questiion and sending back;
            const newData = await Poll.findOne({ _id: postId }).populate([
                { path: "user", model: "Userdoubthelper", select: 'name' },
                { path: 'votes.user', mode: "Userdoubthelper", select: 'name' },
            ])
            if (newData) return res.status(200).send(newData);
            else return res.status(500).send({ message: "something went wrong" })
        }
    }
    catch (error) {        
        res.status(500).send({ message: "Something wrong happened" })
    }
}
module.exports = { getPosts, createPosts, deletePost, likePost };


