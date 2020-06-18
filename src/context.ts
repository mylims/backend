import { MongoClient } from 'mongodb';

import { Component } from './component/component.model';
import { DbConnector } from './connector';
import { Experiment } from './experiment/experiment.model';
import { Kind } from './kind/kind.model';
import { Measurement } from './measurement/measurement.model';
import { Sample } from './sample/sample.model';

export interface Models {
  component: Component;
  experiment: Experiment;
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
      experiment: new Experiment(db),
      kind: new Kind(db),
      measurement: new Measurement(db),
      sample: new Sample(db),
    },
    db,
  };
};
