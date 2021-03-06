import { MongoClient, ObjectID } from 'mongodb';

import { Base } from '../base/base.model';
import { Measurement as MeasurementType } from '../generated/graphql';

export class Measurement extends Base<MeasurementType> {
  public constructor(connection: MongoClient) {
    super(connection, 'mylims', 'measurement');
  }

  public findByParentId(id: string) {
    const sample = new ObjectID(id);
    return this.findMany({ sample });
  }
}
