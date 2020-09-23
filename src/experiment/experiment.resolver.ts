import { ObjectId } from 'mongodb';

import { Context, Models } from '../context';
import { Resolvers, ExperimentDbObject } from '../generated/graphql';
import { randomId } from '../utils/fake';
import { bulkFindById } from '../utils/resolvers';

async function appendSample(
  models: Models,
  sampleId: string,
  experimentId: string,
  key: 'input' | 'output',
) {
  const child = await models.sample.findById(sampleId);
  if (!child) {
    throw new Error(`Sample ${sampleId} doesn't exist`);
  }

  const ans = await models.experiment.append(experimentId, { [key]: sampleId });
  if (!ans || !ans.value) {
    throw new Error(`Append ${sampleId} to ${experimentId} failed`);
  }
  return ans.value;
}

export const experimentResolver: Resolvers<Context> = {
  Query: {
    experiment(_, { _id }, { models: { experiment } }) {
      return experiment.findById(_id);
    },
    experiments(_, { page, filters }, { models: { experiment } }) {
      return experiment.findPaginated(page, filters);
    },
  },

  Experiment: {
    input({ input }, _, { models: { sample } }) {
      return bulkFindById(input, sample);
    },
    output({ output }, _, { models: { sample } }) {
      return bulkFindById(output, sample);
    },
  },

  Mutation: {
    async createExperiment(_, { experiment }, { models }) {
      const { kind, date, user } = experiment.status || {};
      const created: Omit<ExperimentDbObject, '_id'> = {
        ...experiment,
        codeId: experiment.codeId || randomId(16),
        title: experiment.title || '',
        status: experiment.status && [
          {
            kind: kind || '',
            date: date || new Date().toString(),
            user: typeof user === 'string' ? new ObjectId(user) : user,
          },
        ],
      };
      const inserted = await models.experiment.insertOne(created);
      return inserted.result && inserted.ops[0];
    },
    async updateExperiment(_, { _id, experiment }, { models }) {
      const { status, ...updated } = experiment;
      const { value } = await models.experiment.updateOne(_id, updated);
      if (!value) throw new Error(`Updated failed to ${_id}`);

      if (status) {
        const { value: add } = await models.experiment.append(_id, { status });
        if (!add) throw new Error(`Updated failed to ${_id}`);
        return add;
      } else {
        return value;
      }
    },
    appendExperimentInput(_, { sampleId, experimentId }, { models }) {
      return appendSample(models, sampleId, experimentId, 'input');
    },
    appendExperimentOutput(_, { sampleId, experimentId }, { models }) {
      return appendSample(models, sampleId, experimentId, 'output');
    },
  },
};
