import { gql } from 'apollo-server-fastify';

export const sampleSchema = gql`
  type SampleComment @entity(embedded: true) {
    date: String @column
    title: String! @column
    description: String! @column
    user: String! @column
  }

  input SampleCommentInput {
    date: String
    title: String!
    description: String!
    user: String!
  }

  type SampleSummary @entity(embedded: true) {
    name: String! @column
    value: String! @column
    units: String! @column
  }

  input SampleSummaryInput {
    name: String!
    value: String!
    units: String!
  }

  type Sample @entity {
    _id: String! @id
    codeId: String! @column
    title: String! @column
    status: [Status!] @embedded
    description: String @column
    comments: [SampleComment!] @embedded
    summary: [SampleSummary!] @embedded
    attachments: [File!] @link
    measurements: [Measurement!] @link
  }

  input SampleInput {
    codeId: String
    title: String
    status: StatusInput
    description: String
    comments: [SampleCommentInput!]
    summary: [SampleSummaryInput!]
  }

  input SampleFilters {
    codeId: String
    title: String
    status: String
    statusDate: String
    description: String
    comments: String
    summary: String
  }

  type SamplePage implements Pagination {
    result: [Sample!]
    totalCount: Int!
  }

  extend type Query {
    sample(_id: String!): Sample
    samples(page: Int!, filters: SampleFilters!): SamplePage!
  }

  extend type Mutation {
    createSample(sample: SampleInput!): Sample
    updateSample(_id: String!, sample: SampleInput!): Sample
    appendSampleAttachment(fileId: String!, sampleId: String!): File
    appendSampleMeasurement(
      measurementId: String!
      sampleId: String!
    ): Measurement
  }
`;
