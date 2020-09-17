import { gql } from 'apollo-server-fastify';

export const baseSchema = gql`
  directive @auth(admin: Boolean) on FIELD_DEFINITION
  directive @admin on FIELD_DEFINITION

  # Allows the use of JSONs
  scalar JSON

  type Status @entity(embedded: true) {
    kind: String! @column
    date: String! @column
    user: User @link
  }

  input StatusInput {
    kind: String!
    date: String
    user: String
  }

  interface Pagination {
    totalCount: Int!
  }

  # This schema allows empty mutations in order to extend them
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
`;
