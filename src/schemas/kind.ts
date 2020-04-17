import { gql } from 'apollo-server-fastify';

export const kindSchema = gql`
  type Kind {
    _id: String!
    name: String!
    description: String
    schema: JSON
  }

  extend type Query {
    kind(_id: String!): Kind
    kindByName(name: String!): [Kind]
  }
`;
