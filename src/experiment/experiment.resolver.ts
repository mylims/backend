import { IResolvers } from 'graphql-tools';
import { MongoClient, ObjectId } from 'mongodb';

import { Component } from '../component/component.model';
import { Sample } from '../sample/sample.model';
import { Status } from '../utils/types';
import { randomId } from '../utils/fake';

import { Experiment, ExperimentType } from './experiment.model';

/**
 * Simplifies the resolver manipulation
 * @param params - Resolver parameters
 */
function experimentHelper(
  params: [unknown, Partial<ExperimentType>, { db: MongoClient }, unknown],
): Partial<ExperimentType> | { db: Experiment } {
  return { ...params[1], db: new Experiment(params[2].db) };
}

/**
 * Simplifies interaction with samples
 * @param params - Resolver parameters
 * @param key - Searched field
 */
function fetchSamples(
  params: [
    { input?: string[]; output?: string[] },
    Partial<ExperimentType>,
    { db: MongoClient },
    unknown,
  ],
  key: 'input' | 'output',
) {
  const samples = new Sample(params[2].db);
  const list = params[0][key];
  if (list) {
    const promSamples = list.map((id: string) => samples.findById(id));
    return Promise.all(promSamples);
  } else {
    return null;
  }
}

/**
 * Simplifies sample appending
 * @param params - Resolver parameters
 * @param key - Field to be appended
 */
async function appendSamples(
  params: [
    unknown,
    { sampleId: string; experimentId: string },
    { db: MongoClient },
    unknown,
  ],
  key: 'input' | 'output',
) {
  const { sampleId, experimentId } = params[1];
  const { db } = params[2];

  const sample = await new Sample(db).findById(sampleId);
  if (sample == null) {
    throw Error(`Sample ${sampleId} doesn't exist`);
  }

  const ans = await new Experiment(db).appendTo(experimentId, {
    [key]: sampleId,
  });
  return ans && ans.value;
}

export const experimentResolver: IResolvers = {
  Query: {
    // Search experiment by id
    experiment: (...params) => {
      const { db, _id } = experimentHelper(params) as {
        db: Experiment;
        _id: string;
      };
      return db.findById(_id);
    },
    experimentByCodeId: (...params) => {
      const { db, codeId } = experimentHelper(params) as {
        db: Experiment;
        codeId: string;
      };
      return db.findByCodeId(codeId);
    },

    // General search
    experimentByOwner: (...params) => {
      const { db, owner } = experimentHelper(params) as {
        db: Experiment;
        owner: string;
      };
      return db.findByOwner(owner);
    },
    experimentByTag: (...params) => {
      const { db, tag } = experimentHelper(params) as {
        db: Experiment;
        tag: string;
      };
      return db.findByTag(tag);
    },
    experimentByTitle: (...params) => {
      const { db, title } = experimentHelper(params) as {
        db: Experiment;
        title: string;
      };
      return db.findByTitle(title);
    },
  },

  Experiment: {
    input: (...params) => fetchSamples(params, 'input'),
    output: (...params) => fetchSamples(params, 'output'),
    components: ({ _id }: { _id: string }, _, { db }: { db: MongoClient }) => {
      return new Component(db).findByParentId(_id);
    },
  },

  Mutation: {
    createExperiment: async (...params) => {
      const { db, experiment } = experimentHelper(params) as {
        db: Experiment;
        experiment: ExperimentType;
      };
      experiment.codeId = randomId(16);
      experiment.creationDate = new Date().toString();
      const inserted = await db.insertOne(experiment);
      return inserted.result && inserted.ops[0];
    },

    updateExperiment: async (...params) => {
      const {
        db,
        _id,
        tags,
        title,
        description,
        status,
        meta,
      } = experimentHelper(params) as {
        db: Experiment;
        _id: string;
        tags: string[];
        title: string;
        description: string;
        status: Status[];
        meta: object;
      };
      const updater: Partial<ExperimentType> = {
        tags,
        title,
        description,
        status,
        meta,
        lastModificationDate: new Date().toString(),
      };
      const { value } = await db.updateOne(_id, updater);
      return value;
    },

    appendExperimentInput: (...params) => appendSamples(params, 'input'),
    appendExperimentOutput: (...params) => appendSamples(params, 'output'),

    appendExperimentComponent: async (
      _,
      {
        componentId,
        experimentId,
      }: { componentId: string; experimentId: string },
      { db }: { db: MongoClient },
    ) => {
      const components = new Component(db);
      const component = await components.findById(componentId);
      if (!component) {
        throw Error(`Component ${componentId} doesn't exist`);
      }

      const experiments = new Experiment(db);
      const experiment = await experiments.findById(experimentId);
      if (!experiment) {
        throw Error(`Experiment ${experimentId} doesn't exist`);
      }

      const { value } = await components.updateOne(componentId, {
        parent: new ObjectId(experimentId),
      });
      return value;
    },
  },
};
