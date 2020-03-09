const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        author: {
            type: Schema.Types.ObjectId,
            default: "5e667ea4d9ae1785f843191e",
            ref: "User"
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

module.exports = mongoose.model("Post", postSchema);
