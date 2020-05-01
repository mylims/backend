import { IResolvers } from 'graphql-tools';
import { MongoClient } from 'mongodb';
import { v4 as uuidv4 } from 'uuid';

import { Status } from '../utils/types';

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
    experimentByUuid: (...params) => {
      const { db, uuid } = experimentHelper(params) as {
        db: Experiment;
        uuid: string;
      };
      return db.findByUuid(uuid);
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

  Mutation: {
    createExperiment: async (...params) => {
      const { db, experiment } = experimentHelper(params) as {
        db: Experiment;
        experiment: ExperimentType;
      };
      experiment.codeId = uuidv4(); // TODO use cheminfo tool
      experiment.uuid = uuidv4();
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
        input,
        output,
      } = experimentHelper(params) as {
        db: Experiment;
        _id: string;
        tags: string[];
        title: string;
        description: string;
        status: Status[];
        meta: object;
        input: string[];
        output: string[];
      };
      const updater: Partial<ExperimentType> = {
        tags,
        title,
        description,
        status,
        meta,
        input,
        output,
        lastModificationDate: new Date().toString(),
      };
      const { value } = await db.updateOne(_id, updater);
      return value;
    },
  },
};
