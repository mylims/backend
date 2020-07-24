import { gql } from 'apollo-server-fastify';

export const kindSchema = gql`
  type Kind @entity {
    _id: String! @id
    name: String! @column
    path: [String!] @column
    description: String @column
    schema: JSON @column
  }

  input KindInput {
    name: String
    path: [String!]
    description: String
    schema: JSON
  }

  input KindFilters {
    name: String
    path: String
    description: String
  }

  type KindPage implements Pagination {
    result: [Kind!]
    totalCount: Int!
  }

  extend type Query {
    kind(_id: String!): Kind
    kinds(page: Int!, filters: KindFilters!): KindPage!
  }

  extend type Mutation {
    createKind(kind: KindInput!): Kind!
    updateKind(_id: String!, kind: KindInput!): Kind!
  }
`;
