import { gql } from 'apollo-server-fastify';

export const sampleSchema = gql`
  type SampleComment {
    date: String
    title: String!
    description: String!
    user: String!
  }

  input SampleCommentInput {
    date: String
    title: String!
    description: String!
    user: String!
  }

  type SampleSummary {
    name: String!
    value: String!
    units: String!
  }

  input SampleSummaryInput {
    name: String!
    value: String!
    units: String!
  }

  type Sample {
    _id: String! # it's the same generated by MongoDB
    title: String!
    status: [Status!]
    description: String
    comments: [SampleComment!]
    summary: [SampleSummary!]
    components: [Component!]
  }

  input SampleInput {
    title: String!
    status: [StatusInput!]
    description: String
    comments: [SampleCommentInput!]
    summary: [SampleSummaryInput!]
  }

  extend type Query {
    # search sample by ids
    sample(_id: String!): Sample

    # general search
    sampleByTitle(title: String!): [Sample!]
  }

  extend type Mutation {
    createSample(sample: SampleInput!): Sample
    updateSample(
      _id: String!
      title: String
      status: [StatusInput!]
      description: String
      comments: [SampleCommentInput!]
      summary: [SampleSummaryInput!]
    ): Sample
    appendSampleComponent(componentId: String!, sampleId: String!): Component
  }
`;
