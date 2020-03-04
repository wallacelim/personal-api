const router = require("express").Router();
let Post = require("../models/post.model");

router.route("/").get((req, res) => {
    Post.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json("Error: " + error));
});

router.route("/add").post((req, res) => {
    const title = req.body.title;
    const author = req.body.author;
    const category = req.body.category ? req.body.category : null;
    const body = req.body.body;
    const date = req.body.date ? req.body.date : null;
    const hidden = req.body.hidden ? req.body.hidden : false;
    const newPost = new Post({ title, author, category, body, date, hidden });
    newPost
        .save()
        .then(() => res.json("Post added"))
        .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
    Post.findById(req.params.id)
        .then(post => res.json(post))
        .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
    Post.findByIdAndDelete(req.params.id)
        .then(post => res.json(post))
        .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
