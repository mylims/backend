import { gql } from 'apollo-server-fastify';

export const measurementSchema = gql`
  type Measurement @entity {
    _id: String! @id
    sample: String @column
    title: String! @column
    description: String @column
    status: [Status!] @column
    startTime: String @column
    endTime: String @column
    content: JSON @column
    components: [Component!] @link
  }

  input MeasurementInput {
    title: String!
    description: String
    status: [StatusInput!]
    startTime: String
    endTime: String
    content: JSON
  }

  input MeasurementFilters {
    title: String
    description: String
    status: String
    startTime: String
    endTime: String
  }

  extend type Query {
    measurement(_id: String!): Measurement
    measurements(page: Int!, filters: MeasurementFilters!): [Measurement!]
  }

  extend type Mutation {
    createMeasurement(measurement: MeasurementInput!): Measurement
    updateMeasurement(_id: String!, measurement: MeasurementInput!): Measurement
    appendMeasurementComponent(
      componentId: String!
      measurementId: String!
    ): Component
  }
`;
