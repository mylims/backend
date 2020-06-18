import { MongoClient } from 'mongodb';

import { Base } from '../base/base.model';
import { Sample as SampleType } from '../generated/graphql';

export class Sample extends Base<SampleType> {
  public constructor(connection: MongoClient) {
    super(connection, 'mylims', 'sample');
  }
}
