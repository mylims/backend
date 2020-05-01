import { IResolvers } from 'graphql-tools';
import { MongoClient } from 'mongodb';
import { v4 as uuidv4 } from 'uuid';

import { Status } from '../utils/types';

import {
  Sample,
  SampleType,
  SampleComment,
  SampleSummary,
} from './sample.model';

/**
 * Simplifies the resolver manipulation
 * @param params - Resolver parameters
 */
function sampleHelper(
  params: [unknown, Partial<SampleType>, { db: MongoClient }, unknown],
): Partial<SampleType> | { db: Sample } {
  return { ...params[1], db: new Sample(params[2].db) };
}

export const sampleResolver: IResolvers = {
  Query: {
    // Search sample by id
    sample: (...params) => {
      const { db, _id } = sampleHelper(params) as {
        db: Sample;
        _id: string;
      };
      return db.findById(_id);
    },
    sampleByUuid: (...params) => {
      const { db, uuid } = sampleHelper(params) as {
        db: Sample;
        uuid: string;
      };
      return db.findByUuid(uuid);
    },

    // General search
    sampleByTitle: (...params) => {
      const { db, title } = sampleHelper(params) as {
        db: Sample;
        title: string;
      };
      return db.findByTitle(title);
    },
  },

  Mutation: {
    createSample: async (...params) => {
      const { db, sample } = sampleHelper(params) as {
        db: Sample;
        sample: SampleType;
      };
      sample.uuid = uuidv4();
      const inserted = await db.insertOne(sample);
      return inserted.result && inserted.ops[0];
    },
    updateSample: async (...params) => {
      const {
        db,
        _id,
        title,
        status,
        description,
        comments,
        summary,
      } = sampleHelper(params) as {
        db: Sample;
        _id: string;
        title: string;
        status?: Status[];
        description?: string;
        comments?: SampleComment[];
        summary?: SampleSummary[];
      };
      const updater: Partial<SampleType> = {
        title,
        status,
        description,
        comments,
        summary,
      };
      const { value } = await db.updateOne(_id, updater);
      return value;
    },
  },
};
