import { MongoClient, ObjectID } from 'mongodb';

import { Base } from '../utils/base.model';
import { Status } from '../utils/types';

export interface SampleComment {
  date?: string;
  title: string;
  description: string;
  user: string;
}
export interface SampleSummary {
  name: string;
  value: string;
  units: string;
}

export interface SampleType {
  _id: string | ObjectID;
  uuid: string;
  title: string;
  status?: Status[];
  description?: string;
  comments?: SampleComment[];
  summary?: SampleSummary[];
}

export class Sample extends Base<SampleType> {
  public constructor(connection: MongoClient) {
    super(connection, 'mylims', 'sample');
  }

  // Unique id searchers
  public async findByUuid(uuid: string): Promise<SampleType | null> {
    return this.findOne({ uuid });
  }

  // General searches
  public async findByTitle(title: string): Promise<SampleType[] | null> {
    return this.findMany({ title });
  }
}
