import { ObjectId } from 'mongodb';

import { Context } from '../context';
import { Resolvers, SampleDbObject } from '../generated/graphql';
import { randomId } from '../utils/fake';

export const sampleResolver: Resolvers<Context> = {
  Query: {
    sample(_, { _id }, { models: { sample } }) {
      return sample.findById(_id);
    },
    samples(_, { page, filters }, { models: { sample } }) {
      return sample.findPaginated(page, filters);
    },
  },

  Sample: {
    components: ({ _id }, _, { models: { component } }) => {
      return component.findByParentId(_id);
    },
    measurements: ({ _id }, _, { models: { measurement } }) => {
      return measurement.findByParentId(_id);
    },
  },

  Mutation: {
    async createSample(_, { sample }, { models }) {
      const created: Omit<SampleDbObject, '_id'> = {
        ...sample,
        title: sample.title || '',
        codeId: randomId(16),
        status: sample.status ? [sample.status] : null,
      };
      const inserted = await models.sample.insertOne(created);
      return inserted.result && inserted.ops[0];
    },
    async updateSample(_, { _id, sample }, { models }) {
      const { status, comments, summary, ...updated } = sample;
      const { value } = await models.sample.updateOne(_id, updated);
      if (!value) throw new Error(`Updated failed to ${_id}`);

      if (status || comments || summary) {
        const add = { status, comments, summary };
        const { value: added } = await models.sample.append(_id, add);
        if (!added) throw new Error(`Updated failed to ${_id}`);
        return added;
      } else {
        return value;
      }
    },
    async appendSampleComponent(_, { componentId, sampleId }, { models }) {
      const component = await models.component.findById(componentId);
      if (!component) throw Error(`Component ${componentId} doesn't exist`);

      const sample = await models.sample.findById(sampleId);
      if (!sample) throw Error(`Sample ${sampleId} doesn't exist`);

      const { value } = await models.component.updateOne(componentId, {
        parent: new ObjectId(sampleId),
      });
      return value || null;
    },
    async appendSampleMeasurement(_, { measurementId, sampleId }, { models }) {
      const measurement = await models.measurement.findById(measurementId);
      if (!measurement) {
        throw Error(`Measurement ${measurementId} doesn't exist`);
      }

      const sample = await models.sample.findById(sampleId);
      if (!sample) throw Error(`Sample ${sampleId} doesn't exist`);

      const { value } = await models.measurement.updateOne(measurementId, {
        sample: new ObjectId(sampleId),
      });
      return value || null;
    },
  },
};
