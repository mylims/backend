import { gql } from 'apollo-server-fastify';

export const measurementSchema = gql`
  type Measurement @entity {
    _id: String! @id
    title: String! @column
    description: String @column
    status: [Status!] @embedded
    content: JSON @column
    attachement: [File!] @link
    sample: String @column
  }

  input MeasurementInput {
    title: String
    description: String
    status: StatusInput
    content: JSON
  }

  input MeasurementFilters {
    title: String
    description: String
    status: String
    statusDate: String
  }

  type MeasurementPage implements Pagination {
    result: [Measurement!]
    totalCount: Int!
  }

  extend type Query {
    measurement(_id: String!): Measurement
    measurements(page: Int!, filters: MeasurementFilters!): MeasurementPage!
  }

  extend type Mutation {
    createMeasurement(measurement: MeasurementInput!): Measurement
    updateMeasurement(_id: String!, measurement: MeasurementInput!): Measurement
    appendMeasurementAttachment(fileId: String!, measurementId: String!): File
  }
`;
