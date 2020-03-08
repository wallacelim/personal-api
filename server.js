const express = require("express");
const cors = require("cors");
var mongoose = require("mongoose");
const graphqlHTTP = require("express-graphql");
const { buildSchema } = require("graphql");
const Post = require("./models/post.model.js");

require("dotenv").config();

var app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use(
    "/graphql",
    graphqlHTTP({
        schema: buildSchema(`
            type Post {
                _id: ID!
                title: String!
                body: String!
                author: String!
                category: String
                date: String!
                hidden: Boolean
            }

            input PostInput {
                title: String!
                body: String!
                author: String!
                category: String
                date: String!
                hidden: Boolean
            }

            type RootQuery {
                posts: [Post!]!
            }

            type RootMutation {
                createPost(postInput: PostInput): Post
            }

            schema {
                query: RootQuery
                mutation: RootMutation
            }
        `),
        rootValue: {
            posts: async () => {
                try {
                    const posts = await Post.find();
                    return posts.map(post => {
                        return { ...post._doc };
                    });
                } catch (err) {
                    throw err;
                }
            },
            createPost: async args => {
                const post = new Post({
                    title: args.postInput.title,
                    body: args.postInput.body,
                    author: args.postInput.author,
                    category: args.postInput.category,
                    date: new Date(args.postInput.date),
                    hidden: args.postInput.hidden
                });
                try {
                    const result = await post.save();
                    console.log(result);
                    return { ...result._doc };
                } catch (err) {
                    console.error(err);
                    throw err;
                }
            }
        },
        graphiql: true
    })
);

// // Establish db with DB
const uri = process.env.ATLAS_URI_RW;
mongoose
    .connect(uri, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
    .then(() =>
        app.listen(port, () => console.log(`listening on port ${port}`))
    )
    .catch(err => console.error(err));
// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "Connection error:"));
// db.once("open", () =>
//     console.log("MongoDB connection established successfully.")
// );

// import postsRouter from "./routes/posts";

// app.use("/posts", postsRouter);

// app.get("/", (req, res) => {
//     res.send("test API");
// });
