import { ObjectId } from 'mongodb';

import { Context } from '../context';
import { Resolvers } from '../generated/graphql';

export const measurementResolver: Resolvers<Context> = {
  Query: {
    measurement(_, { _id }, { models: { measurement } }) {
      return measurement.findById(_id);
    },
    measurements(_, { page, filters }, { models: { measurement } }) {
      return measurement.findPaginated(page, filters);
    },
  },

  Measurement: {
    components: ({ _id }, _, { models: { component } }) => {
      return component.findByParentId(_id);
    },
  },

  Mutation: {
    async createMeasurement(_, { measurement }, { models }) {
      const inserted = await models.measurement.insertOne(measurement);
      return inserted.result && inserted.ops[0];
    },
    async updateMeasurement(_, { _id, measurement }, { models }) {
      const { value } = await models.measurement.updateOne(_id, measurement);
      if (!value) throw new Error(`Updated failed to ${_id}`);
      return value;
    },
    appendMeasurementComponent: async (
      _,
      { componentId, measurementId },
      { models },
    ) => {
      const component = await models.component.findById(componentId);
      if (!component) {
        throw new Error(`Component ${componentId} doesn't exist`);
      }

      const measurement = await models.measurement.findById(measurementId);
      if (!measurement) {
        throw new Error(`Measurement ${measurementId} doesn't exist`);
      }

      const { value } = await models.component.updateOne(componentId, {
        parent: new ObjectId(measurementId),
      });
      return value || null;
    },
  },
};
