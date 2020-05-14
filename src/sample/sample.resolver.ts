import { IResolvers } from 'graphql-tools';
import { MongoClient, ObjectId } from 'mongodb';

import { Component } from '../component/component.model';
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

    // General search
    sampleByTitle: (...params) => {
      const { db, title } = sampleHelper(params) as {
        db: Sample;
        title: string;
      };
      return db.findByTitle(title);
    },
  },

  Sample: {
    components: ({ _id }: { _id: string }, _, { db }: { db: MongoClient }) => {
      return new Component(db).findByParentId(_id);
    },
  },

  Mutation: {
    createSample: async (...params) => {
      const { db, sample } = sampleHelper(params) as {
        db: Sample;
        sample: SampleType;
      };
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
    appendSampleComponent: async (
      _,
      { componentId, sampleId }: { componentId: string; sampleId: string },
      { db }: { db: MongoClient },
    ) => {
      const components = new Component(db);
      const component = await components.findById(componentId);
      if (!component) {
        throw Error(`Component ${componentId} doesn't exist`);
      }

      const samples = new Sample(db);
      const sample = await samples.findById(sampleId);
      if (!sample) {
        throw Error(`Sample ${sampleId} doesn't exist`);
      }

      const { value } = await components.updateOne(componentId, {
        parent: new ObjectId(sampleId),
      });
      return value;
    },
  },
};
