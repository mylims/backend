import { MongoClient } from 'mongodb';

import { Base } from '../base/base.model';
import { Experiment as ExperimentType } from '../generated/graphql';

export class Experiment extends Base<ExperimentType> {
  public constructor(connection: MongoClient) {
    super(connection, 'mylims', 'experiment');
  }
}
