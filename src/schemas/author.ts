import { gql } from 'apollo-server-fastify';

export const authorSchema = gql`
  type Author {
    id: Int!
    firstName: String
    lastName: String
    """
    the list of Posts by this author
    """
    posts: [Post]
  }

  extend type Query {
    author(id: Int!): Author
  }
`;
