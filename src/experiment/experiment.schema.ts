import { gql } from 'apollo-server-fastify';

export const experimentSchema = gql`
  type Experiment @entity {
    _id: String! @id
    codeId: String! @column
    title: String! @column
    description: String @column
    status: [Status!] @embedded
    meta: JSON @column
    input: [Sample!] @link
    output: [Sample!] @link
  }

  input ExperimentInput {
    codeId: String
    title: String
    description: String
    status: StatusInput
    meta: JSON
  }

  input ExperimentFilters {
    codeId: String
    title: String
    description: String
    status: String
    statusDate: String
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
  }
`;
