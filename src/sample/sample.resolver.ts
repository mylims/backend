import { ObjectId } from 'mongodb';

import { Context } from '../context';
import { Resolvers, SampleDbObject } from '../generated/graphql';
import { randomId } from '../utils/fake';
import { notEmpty } from '../utils/resolvers';

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
    async attachments({ attachments }, _, { models: { file } }) {
      if (attachments) {
        const promSamples = attachments.map((id) => file.findById(id));
        const files = await Promise.all(promSamples);
        return files.filter(notEmpty);
      } else {
        return null;
      }
    },
    measurements({ _id }, _, { models: { measurement } }) {
      return measurement.findByParentId(_id);
    },
  },

  Mutation: {
    async createSample(_, { sample }, { models }) {
      const { kind, date, user } = sample.status || {};
      const created: Omit<SampleDbObject, '_id'> = {
        ...sample,
        codeId: sample.codeId || randomId(16),
        title: sample.title || '',
        status: sample.status && [
          {
            kind: kind || '',
            date: date || new Date().toString(),
            user: typeof user === 'string' ? new ObjectId(user) : user,
          },
        ],
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
    async appendSampleAttachment(_, { fileId, sampleId }, { models }) {
      const file = await models.file.findById(fileId);
      if (!file) throw Error(`Attachment ${fileId} doesn't exist`);

      const sample = await models.sample.findById(sampleId);
      if (!sample) throw Error(`Sample ${sampleId} doesn't exist`);

      const { value } = await models.file.updateOne(fileId, {
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
