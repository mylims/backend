import { gql } from 'apollo-server-fastify';

export const projectSchema = gql`
  type Project @entity {
    _id: String! @id
    title: String! @column
    description: String @column
    owners: [User!] @link
    tags: [String!] @column
    status: [Status!] @embedded
    meta: JSON @column
    view: JSON @column
    experiments: [Experiment!] @link
    samples: [Sample!] @link
  }

  input ProjectInput {
    title: String
    description: String
    owner: String
    tags: [String!]
    status: StatusInput
    meta: JSON
  }

  input ProjectFilters {
    title: String
    description: String
    owner: String
    tags: [String!]
    status: String
    statusDate: String
  }

  type ProjectPage implements Pagination {
    result: [Project!]
    totalCount: Int!
  }

  extend type Query {
    project(_id: String!): Project
    projects(page: Int!, filters: ProjectFilters!): ProjectPage
  }

  extend type Mutation {
    createProject(project: ProjectInput!): Project
    updateProject(_id: String!, project: ProjectInput!): Project
  }
`;
