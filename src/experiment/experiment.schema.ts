import { gql } from 'apollo-server-fastify';

export const experimentSchema = gql`
  type Status @entity(embedded: true) {
    kind: String! @column
    date: String @column
  }

  input StatusInput {
    kind: String!
    date: String!
  }

  type Experiment @entity {
    _id: String! @id
    codeId: String! @column
    owners: [String!] @column
    tags: [String!] @column
    title: String! @column
    description: String @column
    creationDate: String! @column
    lastModificationDate: String @column
    status: [Status!] @embedded
    meta: JSON @column
    input: [Sample!] @link
    output: [Sample!] @link
    components: [Component!] @link
  }

  input ExperimentInput {
    codeId: String
    owners: [String!]
    tags: [String!]
    title: String
    description: String
    creationDate: String
    lastModificationDate: String
    status: StatusInput
    meta: JSON
  }

  input ExperimentFilters {
    owners: [String!]
    tags: [String!]
    title: String
    description: String
    creationDate: String
    lastModificationDate: String
    status: String
  }

  type ExperimentPage implements Pagination {
    result: [Experiment!]
    totalCount: Int!
  }

  extend type Query {
    experiment(_id: String!): Experiment
    experiments(page: Int!, filters: ExperimentFilters!): ExperimentPage
  }

  extend type Mutation {
    createExperiment(experiment: ExperimentInput!): Experiment
    updateExperiment(_id: String!, experiment: ExperimentInput!): Experiment
    appendExperimentInput(sampleId: String!, experimentId: String!): Experiment
    appendExperimentOutput(sampleId: String!, experimentId: String!): Experiment
    appendExperimentComponent(
      componentId: String!
      experimentId: String!
    ): Component
  }
`;
