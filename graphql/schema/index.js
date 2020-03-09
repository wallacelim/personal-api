const { buildSchema } = require("graphql");

module.exports = buildSchema(`
    type Post {
        _id: ID!
        title: String!
        body: String!
        author: User!
        category: String
        date: String!
        hidden: Boolean
    }

    input PostInput {
        title: String!
        body: String!
        author: String
        category: String
        date: String!
        hidden: Boolean
    }

    type User {
        _id: ID!
        email: String!
        password: String 
        posts: [Post!]!
    }

    input UserInput {
        email: String!
        password: String!
    }

    type RootQuery {
        posts: [Post!]!
    }

    type RootMutation {
        createPost(postInput: PostInput): Post
        createUser(userInput: UserInput) : User
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
