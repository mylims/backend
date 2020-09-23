import { ObjectId } from 'mongodb';

import { Context } from '../context';
import { Resolvers, MeasurementDbObject } from '../generated/graphql';
import { bulkFindById } from '../utils/resolvers';

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
    attachement({ attachement }, _, { models: { file } }) {
      return bulkFindById(attachement, file);
    },
  },

  Mutation: {
    async createMeasurement(_, { measurement }, { models }) {
      const { kind, date, user } = measurement.status || {};
      const created: Omit<MeasurementDbObject, '_id'> = {
        ...measurement,
        title: measurement.title || '',
        status: measurement.status && [
          {
            kind: kind || '',
            date: date || new Date().toString(),
            user: typeof user === 'string' ? new ObjectId(user) : user,
          },
        ],
      };
      const inserted = await models.measurement.insertOne(created);
      return inserted.result && inserted.ops[0];
    },
    async updateMeasurement(_, { _id, measurement }, { models }) {
      const { status, ...updated } = measurement;
      const { value } = await models.measurement.updateOne(_id, updated);
      if (!value) throw new Error(`Updated failed to ${_id}`);

      if (status) {
        const { value: add } = await models.measurement.append(_id, { status });
        if (!add) throw new Error(`Updated failed to ${_id}`);
        return add;
      } else {
        return value;
      }
    },
    async appendMeasurementAttachment(
      _,
      { fileId, measurementId },
      { models },
    ) {
      const file = await models.file.findById(fileId);
      if (!file) {
        throw new Error(`File ${fileId} doesn't exist`);
      }

      const measurement = await models.measurement.findById(measurementId);
      if (!measurement) {
        throw new Error(`Measurement ${measurementId} doesn't exist`);
      }

      const { value } = await models.file.updateOne(fileId, {
        parent: new ObjectId(measurementId),
      });
      return value || null;
    },
  },
};
