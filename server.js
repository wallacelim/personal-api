const express = require("express");
const cors = require("cors");
var mongoose = require("mongoose");
const graphqlHTTP = require("express-graphql");

const graphqlSchema = require("./graphql/schema/index");
const graphqlResolvers = require("./graphql/resolvers/index");

require("dotenv").config();

var app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use(
    "/graphql",
    graphqlHTTP({
        schema: graphqlSchema,
        rootValue: graphqlResolvers,
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
