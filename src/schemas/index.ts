import { gql } from 'apollo-server-fastify';

import { authorSchema } from './author';
import { postSchema } from './post';

export const baseSchema = gql`
  # this schema allows empty mutations in order to extend them
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
`;

export const typeDefs = [baseSchema, authorSchema, postSchema];
