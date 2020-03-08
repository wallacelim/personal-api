const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        author: {
            type: String,
            default: "Wallace"
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

// const { buildSchema } = require("graphql");

// const schema = new buildSchema(`
//     Post {
//         title: String!
//         author: String!
//         category: {
//             type: String
//         },
//         body: {
//             type: String,
//             required: true
//         },
//         date: {
//             type: Date,
//             default: Date.now
//         },
//         hidden: {
//             type: Boolean,
//             default: false
//         }
//     },
//     {
//         timestamps: true
//     }
// `);

// module.exports = Post;
