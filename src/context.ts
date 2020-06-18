import { MongoClient } from 'mongodb';

import { Component } from './component/component.model';
import { DbConnector } from './connector';
import { Kind } from './kind/kind.model';
import { Measurement } from './measurement/measurement.model';
import { Sample } from './sample/sample.model';

interface Models {
  component: Component;
  kind: Kind;
  measurement: Measurement;
  sample: Sample;
}

export interface Context {
  models: Models;
  db: MongoClient;
}

export const context: () => Promise<Context> = async () => {
  const db = await new DbConnector().connect();
  return {
    models: {
      component: new Component(db),
      kind: new Kind(db),
      measurement: new Measurement(db),
      sample: new Sample(db),
    },
    db,
  };
};
