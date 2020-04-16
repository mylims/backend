import { gql } from 'apollo-server-fastify';

export const postSchema = gql`
  type Post {
    id: Int!
    title: String
    author: Author
    votes: Int
  }

  extend type Query {
    posts: [Post]
  }

  extend type Mutation {
    upvotePost(postId: Int!): Post
  }
`;
