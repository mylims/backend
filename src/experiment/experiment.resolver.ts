import { ObjectId } from 'mongodb';

import { Context, Models } from '../context';
import {
  Resolvers,
  Sample as SampleType,
  ExperimentDbObject,
} from '../generated/graphql';
import { Sample } from '../sample/sample.model';
import { randomId } from '../utils/fake';
import { notEmpty } from '../utils/resolvers';

async function fetchSamples(
  list: SampleType[] | null | undefined,
  sample: Sample,
) {
  if (list) {
    const promSamples = list.map((id) => sample.findById(id));
    const samples = await Promise.all(promSamples);
    return samples.filter(notEmpty);
  } else {
    return null;
  }
}

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
      return fetchSamples(input, sample);
    },
    output({ output }, _, { models: { sample } }) {
      return fetchSamples(output, sample);
    },
    components({ _id }, _, { models: { component } }) {
      return component.findByParentId(_id);
    },
  },

  Mutation: {
    async createExperiment(_, { experiment }, { models }) {
      const created: Omit<ExperimentDbObject, '_id'> = {
        ...experiment,
        title: experiment.title || '',
        codeId: randomId(16),
        creationDate: new Date().toString(),
        status: experiment.status ? [experiment.status] : null,
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

    async appendExperimentComponent(
      _,
      { componentId, experimentId },
      { models },
    ) {
      const component = await models.component.findById(componentId);
      if (!component) {
        throw Error(`Component ${componentId} doesn't exist`);
      }

      const experiment = await models.experiment.findById(experimentId);
      if (!experiment) {
        throw Error(`Experiment ${experimentId} doesn't exist`);
      }

      const { value } = await models.component.updateOne(componentId, {
        parent: new ObjectId(experimentId),
      });
      return value || null;
    },
  },
};
