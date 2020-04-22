import { MongoClient } from 'mongodb';

import { Base } from './base.model';

export function resolverHelper<T extends typeof Base>(
  params: { [k: string]: unknown },
  { db }: { db: MongoClient },
  Model: T,
): { [k: string]: unknown } {
  return { ...params, db: new Model(db) };
}
