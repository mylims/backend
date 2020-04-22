import { gql } from 'apollo-server-fastify';

import { kindSchema } from './kind/kind.schema';

// Schema where all the other schemas are going to be merged
export const baseSchema = gql`
  # Allows the use of JSONs
  scalar JSON

  # This schema allows empty mutations in order to extend them
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
`;

export const typeDefs = [baseSchema, kindSchema];