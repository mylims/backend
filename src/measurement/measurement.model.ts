import { MongoClient, ObjectID } from 'mongodb';

import { Base } from '../utils/base.model';
import { Status } from '../utils/types';

export interface MeasurementType {
  _id: string | ObjectID;
  sample?: string | ObjectID;
  title: string;
  description?: string;
  status?: Status[];
  startTime?: string;
  endTime?: string;
  content?: object;
}

export class Measurement extends Base<MeasurementType> {
  public constructor(connection: MongoClient) {
    super(connection, 'mylims', 'sample');
  }

  // General searches
  public async findByTitle(title: string): Promise<MeasurementType[] | null> {
    return this.findMany({ title });
  }

  public findBySample(id: string) {
    return this.findMany({ sample: id });
  }
}
