import { IResolvers } from 'graphql-tools';
import { MongoClient } from 'mongodb';

import { resolverHelper } from '../utils/resolvers';

import { Kind } from './kind.model';

function kindHelper(
  params: [unknown, { [k: string]: unknown }, { db: MongoClient }, unknown],
) {
  return resolverHelper<typeof Kind>(params[1], params[2], Kind);
}

export const kindResolver: IResolvers = {
  Query: {
    kind: (...params) => {
      const { db, _id } = kindHelper(params) as { db: Kind; _id: string };
      return db.findById(_id);
    },
    kindByName: (...params) => {
      const { db, name } = kindHelper(params) as { db: Kind; name: string };
      return db.findByName(name);
    },
  },
};
