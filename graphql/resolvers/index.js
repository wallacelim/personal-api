const bcrypt = require("bcryptjs");
const Post = require("../../models/post.model.js");
const User = require("../../models/user.model.js");

const user = async userId => {
    try {
        const user = await User.findById(userId);
        return {
            ...user._doc,
            posts: posts.bind(this, user._doc.posts)
        };
    } catch (err) {
        throw err;
    }
};

const posts = async postIds => {
    try {
        const posts = await Post.find({ _id: { $in: postIds } });
        return posts.map(post => {
            return {
                ...post._doc,
                date: new Date(post._doc.date).toISOString(),
                author: user.bind(this, post.author)
            };
        });
    } catch (err) {
        throw err;
    }
};

module.exports = {
    posts: async () => {
        try {
            const posts = await Post.find();
            return posts.map(post => {
                return {
                    ...post._doc,
                    _id: post.id,
                    date: new Date(post._doc.date).toISOString(),
                    author: user.bind(this, post._doc.author)
                };
            });
        } catch (err) {
            throw err;
        }
    },
    createPost: async args => {
        const post = new Post({
            title: args.postInput.title,
            body: args.postInput.body,
            author: "5e667f9e46ef5c862de56b6b",
            category: args.postInput.category,
            date: new Date(args.postInput.date),
            hidden: args.postInput.hidden
        });
        let createdPost;
        try {
            const result = await post.save();
            createdPost = {
                ...result._doc,
                author: user.bind(this, result._doc.author),
                date: new Date(result._doc.date).toISOString()
            };
            const author = await User.findById("5e667f9e46ef5c862de56b6b");
            if (!author) {
                throw new Error("Cannot find user");
            }
            author.posts.push(post);
            await author.save();
            return createdPost;
        } catch (err) {
            console.error(err);
            throw err;
        }
    },
    createUser: async args => {
        if (
            await User.findOne({
                email: args.userInput.email
            })
        ) {
            throw new Error("User already exists.");
        }
        const user = new User({
            email: args.userInput.email,
            password: await bcrypt.hash(args.userInput.password, 12)
        });
        try {
            const result = await user.save();
            return { ...result._doc, password: null };
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
};
