const { Schema , model } = require('mongoose');

const commentSchema = new Schema({
    content: {
        type: String,
        required: true,
    },
    blogId: {
        type: Schema.Types.ObjectId,
        ref:"blogs",
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
    }
},{timeseries: true});

const Comment = model("comment", commentSchema);

module.exports= Comment;