import { MongoClient } from 'mongodb';

import { Base } from '../base/base.model';
import { Kind as KindType, KindInput, KindFilters } from '../generated/graphql';

export class Kind extends Base<KindType, KindInput, KindFilters> {
  public constructor(connection: MongoClient) {
    super(connection, 'mylims', 'kind');
  }
}
