const mongoose = require("mongoose");
const { Schema } = mongoose;

const archiveSchema = Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },

    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: "Post",
            default: []
        }
    ],

    authorizedUsers: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
            default: []
        }
    ],

    protected: {
        type: Boolean,
        default: false
    },

    accessKey: {
        type: String
    }
});

module.exports = mongoose.model("Archive", archiveSchema);
