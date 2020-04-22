import { IResolvers } from 'graphql-tools';
import { MongoClient } from 'mongodb';

import { Kind } from './kind.model';

/**
 * Simplifies the resolver manipulation
 * @param params - Resolver parameters
 */
function kindHelper(
  params: [unknown, { [k: string]: unknown }, { db: MongoClient }, unknown],
): { [k: string]: unknown; db: Kind } {
  return { ...params[1], db: new Kind(params[2].db) };
}

export const kindResolver: IResolvers = {
  Query: {
    // Search kind by id
    kind: (...params) => {
      const { db, _id } = kindHelper(params);
      return db.findById(_id as string);
    },

    // Search kind by name
    kindByName: (...params) => {
      const { db, name } = kindHelper(params);
      return db.findByName(name as string);
    },
  },
};
