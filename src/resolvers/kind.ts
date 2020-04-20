import { MongoClient } from 'mongodb';

import { Kind } from '../models/kind';

export const kindResolver = {
  Query: {
    kind: (
      _: unknown,
      { _id }: { _id: string },
      { db }: { db: MongoClient },
    ) => {
      const kindDb = new Kind(db);
      return kindDb.findById(_id);
    },
    kindByName: (
      _: unknown,
      { name }: { name: string },
      { db }: { db: MongoClient },
    ) => {
      const kindDb = new Kind(db);
      return kindDb.findByName(name);
    },
  },
};
