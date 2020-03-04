const express = require("express");
const cors = require("cors");
var mongoose = require("mongoose");
const graphqlHTTP = require("express-graphql");

require("dotenv").config();

var app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Establish db with DB
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () =>
    console.log("MongoDB connection established successfully.")
);

app.listen(port, () => console.log(`listening on port ${port}`));

// import postsRouter from "./routes/posts";

// app.use("/posts", postsRouter);

// app.get("/", (req, res) => {
//     res.send("test API");
// });
