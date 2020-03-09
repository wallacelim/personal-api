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

    type Archive {
        _id: ID!
        name: String
        posts: [Post!]!
        authorizedUsers: [User!]!
        protected: Boolean!
        accessKey: String
    }
    
    input ArchiveInput {
        name: String!
        protected: Boolean
        accessKey: String
    }

    type RootQuery {
        posts: [Post!]!
        archives: [Archive!]!
        archive: Archive!
    }

    type RootMutation {
        createPost(postInput: PostInput): Post
        createUser(userInput: UserInput) : User
        createArchive(archiveInput: ArchiveInput) : Archive
        addPostToArchive(postIds: [ID!]!) : [Post!]!
        addUserToArchive(userIds: [ID!]!) : [User!]!
        removePostFromArchive(postIds: [ID!]!) : [Post!]!
        removeUserFromArchive(userIds: [ID!]!) : [User!]!
    }

    

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
