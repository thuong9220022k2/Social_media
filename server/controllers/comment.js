import Comment from "../models/Comment.js";
import Post from "../models/Post.js";
import User from "../models/User.js";

export const createComment = async (req, res) => {
    try {
        const { eventId, userId, comment } = req.body;
        // console.log("Req", req.body);
        const user = await User.findById(userId);
        // console.log("User", user);
        const newComment = new Comment({
            eventId,
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            userPicturePath: user.picturePath,
            comment
        });
        await newComment.save();

        const commentDone = await Comment.find(newComment._id);
        res.status(201).json(commentDone);
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
}

export const getPostComment = async (req, res) => {
    try {
        const { postId } = req.params;
        // console.log("post", postId);
        const comments = await Comment.find({ eventId: postId });
        // console.log("Post", comments);
        res.status(200).json(comments);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}