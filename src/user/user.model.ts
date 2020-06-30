import { MongoClient } from 'mongodb';

import { Base } from '../base/base.model';
import { User as UserType } from '../generated/graphql';
import { hashing, createToken } from '../utils/auth';

export class User extends Base<UserType> {
  public constructor(connection: MongoClient) {
    super(connection, 'mylims', 'kind');
  }

  public async signin(email: string, password: string) {
    const user = await this.findOne({
      email,
    });
    if (!user || !user.salt) return null;
    const verify = hashing(password, user.salt);
    const token = createToken({
      name: user.name,
      email: user.email,
      role: user.role,
    });
    return user.hash === verify ? { token, user } : null;
  }
}
