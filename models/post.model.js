const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            minlength: 1
        },
        author: {
            type: String,
            default: "Wallace",
            trim: true,
            minlength: 1
        },
        category: {
            type: String
        },
        body: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        },
        hidden: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
