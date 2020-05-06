import { MongoClient, ObjectID } from 'mongodb';

import { Base } from '../utils/base.model';

export interface ComponentType {
  _id: string | ObjectID;
  kind: string;
  content?: object;
  input?: string[];
  output?: string[];
}

export class Component extends Base<ComponentType> {
  public constructor(connection: MongoClient) {
    super(connection, 'mylims', 'component');
  }
}
