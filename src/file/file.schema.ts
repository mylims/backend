import { gql } from 'apollo-server-fastify';

export const fileSchema = gql`
  type File @entity {
    _id: String! @id
    filename: String! @column
    hashname: String! @column
    mimetype: String! @column
    creationDate: String! @column
    signedUrl: String!
  }

  input FileInput {
    filename: String!
    hashname: String!
    mimetype: String!
  }

  input FileFilters {
    filename: String
    mimetype: String
  }

  extend type Query {
    file(_id: String!): File
    files(page: Int!, filters: FileFilters!): [File!]
  }

  extend type Mutation {
    createFile(file: FileInput!): File
  }
`;
