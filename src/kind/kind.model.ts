import { MongoClient } from 'mongodb';

import { Base } from '../base/base.model';
import { Kind as KindType } from '../generated/graphql';

export class Kind extends Base<KindType> {
  public constructor(connection: MongoClient) {
    super(connection, 'mylims', 'kind');
  }
}
