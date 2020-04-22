import { MongoClient } from 'mongodb';

import { Base } from '../utils/base.model';

export interface KindType {
  _id: string;
  name: string;
  description?: string;
  schema?: object;
}

export class Kind extends Base {
  public constructor(connection: MongoClient) {
    super(connection, 'mylims', 'kind');
  }

  public async findById(_id: string) {
    return this.db.findOne({ _id });
  }

  public async findByName(name: string) {
    return this.db.find({ name }).toArray();
  }

  public async insertOne(kind: KindType) {
    return this.db.insertOne(kind);
  }
}
