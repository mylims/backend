import { MongoClient } from 'mongodb';

import { Base } from '../base/base.model';
import { User as UserType } from '../generated/graphql';

export class User extends Base<UserType> {
  public constructor(connection: MongoClient) {
    super(connection, 'mylims', 'kind');
  }
}
