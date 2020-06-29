import { gql } from 'apollo-server-fastify';

export const baseSchema = gql`
  directive @auth(role: Role) on FIELD_DEFINITION

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
