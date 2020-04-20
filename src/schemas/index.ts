import { gql } from 'apollo-server-fastify';

import { kindSchema } from './kind';

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
