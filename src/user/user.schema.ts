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
    salt: String @column
    hash: String @column
    groups: [String!] @column
  }

  type AuthUser {
    token: String!
    user: User!
  }

  input UserInput {
    name: String
    email: String
    password: String
    role: Role
  }

  input UserFilters {
    name: String
    email: String
    role: Role
  }

  type UserPage implements Pagination {
    result: [User!]
    totalCount: Int!
  }

  extend type Query {
    user(_id: String!): User
    users(page: Int!, filters: UserFilters!): UserPage!
    signin(email: String!, password: String!): AuthUser
  }

  extend type Mutation {
    createUser(user: UserInput!): AuthUser!
    updateUser(_id: String!, user: UserInput!): User! @auth(role: ADMIN)
  }
`;
