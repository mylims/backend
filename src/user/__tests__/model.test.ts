import { MongoClient, ObjectID } from 'mongodb';

import { DbConnector } from '../../connector';
import { UserDbObject } from '../../generated/graphql';
import { randomId } from '../../utils/fake';
import { User } from '../user.model';

const connector = new DbConnector();
const id = randomId(24);
const userTest: UserDbObject = {
  _id: new ObjectID(id),
  name: 'text',
  email: 'test@test.io',
  role: 'ADMIN',
};

describe('test user model', () => {
  let db: MongoClient;

  beforeAll(async () => {
    db = await connector.connect();
  });

  afterAll(async () => {
    await connector.disconnect();
  });

  it('Basic CRD', async () => {
    // new empty collection
    const user = new User(db);
    expect(await user.getAll()).toHaveLength(0);
    expect(await user.findById(id)).toBeNull();

    // insert one user
    await user.insertOne(userTest);
    expect(await user.getAll()).toHaveLength(1);
    expect(await user.findById(id)).toStrictEqual(userTest);
    expect(await user.findById(randomId(24))).toBeNull();

    // unique id
    await expect(user.insertOne(userTest)).rejects.toThrow(
      /duplicate key error dup key/,
    );

    // delete all
    await user.drop();
    expect(await user.getAll()).toHaveLength(0);
    expect(await user.findById(id)).toBeNull();
  });
});
