import { MongoClient } from 'mongodb';

import { DbConnector } from './connector';
import { Kind } from './kind/kind.model';

interface Models {
  kind: Kind;
}

export interface Context {
  models: Models;
  db: MongoClient;
}

export const context: () => Promise<Context> = async () => {
  const db = await new DbConnector().connect();
  return {
    models: {
      kind: new Kind(db),
    },
    db,
  };
};
