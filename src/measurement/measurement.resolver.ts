import { IResolvers } from 'graphql-tools';
import { MongoClient, ObjectId } from 'mongodb';

import { Component } from '../component/component.model';
import { Status } from '../utils/types';

import { Measurement, MeasurementType } from './measurement.model';

/**
 * Simplifies the resolver manipulation
 * @param params - Resolver parameters
 */
function measurementHelper(
  params: [unknown, Partial<MeasurementType>, { db: MongoClient }, unknown],
): Partial<MeasurementType> | { db: Measurement } {
  return { ...params[1], db: new Measurement(params[2].db) };
}

export const measurementResolver: IResolvers = {
  Query: {
    // Search measurement by id
    measurement: (...params) => {
      const { db, _id } = measurementHelper(params) as {
        db: Measurement;
        _id: string;
      };
      return db.findById(_id);
    },

    // General search
    measurementByTitle: (...params) => {
      const { db, title } = measurementHelper(params) as {
        db: Measurement;
        title: string;
      };
      return db.findByTitle(title);
    },
  },

  Measurement: {
    components: ({ _id }: { _id: string }, _, { db }: { db: MongoClient }) => {
      return new Component(db).findByParentId(_id);
    },
  },

  Mutation: {
    createMeasurement: async (...params) => {
      const { db, measurement } = measurementHelper(params) as {
        db: Measurement;
        measurement: MeasurementType;
      };
      const inserted = await db.insertOne(measurement);
      return inserted.result && inserted.ops[0];
    },
    updateMeasurement: async (...params) => {
      const {
        db,
        _id,
        sample,
        title,
        description,
        status,
        startTime,
        endTime,
        content,
      } = measurementHelper(params) as {
        db: Measurement;
        _id: string;
        sample?: string;
        title?: string;
        description?: string;
        status?: Status[];
        startTime?: string;
        endTime?: string;
        content?: object;
      };
      const updater: Partial<MeasurementType> = {
        sample,
        title,
        description,
        status,
        startTime,
        endTime,
        content,
      };
      const { value } = await db.updateOne(_id, updater);
      return value;
    },
    appendMeasurementComponent: async (
      _,
      {
        componentId,
        measurementId,
      }: { componentId: string; measurementId: string },
      { db }: { db: MongoClient },
    ) => {
      const components = new Component(db);
      const component = await components.findById(componentId);
      if (!component) {
        throw Error(`Component ${componentId} doesn't exist`);
      }

      const measurements = new Measurement(db);
      const measurement = await measurements.findById(measurementId);
      if (!measurement) {
        throw Error(`Measurement ${measurementId} doesn't exist`);
      }

      const { value } = await components.updateOne(componentId, {
        parent: new ObjectId(measurementId),
      });
      return value;
    },
  },
};
