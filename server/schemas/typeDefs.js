// const { gql } = require('@apollo/server');
const { gql } = require('graphql-tag');
const typeDefs = gql`
  # Define the query and mutation functionality (schema)
  type User {
    id: ID!
    username: String!
    email: String!
    savedBooks: [Book]
  }

  type Book {
    bookId: String!
    authors: [String]
    description: String!
    title: String!
    image: String
    link: String
  }

  type Auth {
    token: String!
    # This represents an existing user
    user: User
  }

  type Query {
    getSingleUser(id: ID!): User
  }

  type Mutation {
    # set up mutations to handle login and add user functionality
    createUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(userId: ID!, bookData: BookInput!): User
    deleteBook(userId: ID!, bookId: String!): User
  }

  input BookInput {
    # set up an input type to handle book input data
    # We are doing this because we are passing in an object as an argument to the saveBook mutation
    bookId: String!
    authors: [String]
    description: String!
    title: String!
    image: String
    link: String
  }
`;

module.exports = typeDefs;
