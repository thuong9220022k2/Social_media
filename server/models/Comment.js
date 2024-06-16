import mongoose from "mongoose";

const commentSchema = mongoose.Schema(
    {
        eventId: {
            type: String,
            required: true,
        },
        userId: {
            type: String,
            required: true,
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        userPicturePath: String,
        comment: String,
    },
    { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;