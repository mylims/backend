import { IResolvers } from 'graphql-tools';
import { MongoClient } from 'mongodb';

import { Kind, KindType } from './kind.model';

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

  Mutation: {
    createKind: async (...params) => {
      const { db, kind } = kindHelper(params) as {
        db: Kind;
        kind: KindType;
      };
      const inserted = await db.insertOne(kind);
      return inserted.result && inserted.ops[0];
    },
    updateKind: async (...params) => {
      const { db, _id, name, path, description, schema } = kindHelper(
        params,
      ) as {
        db: Kind;
        _id: string;
        name: string;
        path?: string[];
        description?: string;
        schema?: object;
      };
      const updater: Partial<KindType> = { name, path, description, schema };
      const { value } = await db.updateOne(_id, updater);
      return value;
    },
  },
};
