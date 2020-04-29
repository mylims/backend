import { MongoClient, ObjectID } from 'mongodb';

import { Base } from '../utils/base.model';

export interface KindType {
  _id: string | ObjectID;
  name: string;
  description?: string;
  schema?: object;
}

export class Kind extends Base<KindType> {
  public constructor(connection: MongoClient) {
    super(connection, 'mylims', 'kind');
  }

  /**
   * Search all the elements with the given names
   * @param name - Names to search
   */
  public async findByName(name: string): Promise<KindType[] | null> {
    return this.findMany({ name });
  }
}
