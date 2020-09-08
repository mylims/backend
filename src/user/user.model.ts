import { MongoClient } from 'mongodb';

import { Base } from '../base/base.model';
import { User as UserType } from '../generated/graphql';
import { hashing, createToken } from '../utils/auth';

export class User extends Base<UserType> {
  public constructor(connection: MongoClient) {
    super(connection, 'mylims', 'user');
  }

  public async signin(email: string, password: string) {
    const user = await this.findOne({ email });
    if (!user || !user.salt) return null;
    const verify = hashing(password, user.salt);
    const { name, role } = user;
    const token = createToken({ name, role, email: user.email });
    return user.hash === verify ? { token, user } : null;
  }
}
