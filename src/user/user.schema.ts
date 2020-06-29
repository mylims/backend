import { gql } from 'apollo-server-fastify';

export const userSchema = gql`
  enum Role {
    ADMIN
    GROUP_ADMIN
    MEMBER
  }

  type User @entity {
    _id: String! @id
    name: String! @column
    email: String! @column
    role: Role! @column
    groups: [String!] @column
  }

  input UserInput {
    name: String
    email: String
    role: Role
  }

  input UserFilters {
    name: String
    email: String
    role: Role
  }

  extend type Query {
    user(_id: String!): User
    users(page: Int!, filters: UserFilters!): [User!]
  }

  extend type Mutation {
    createUser(user: UserInput!): User!
    updateUser(_id: String!, user: UserInput!): User!
  }
`;
