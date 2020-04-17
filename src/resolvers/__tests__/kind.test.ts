import { MongoClient } from 'mongodb';

import { DbConnector } from '../../connectors';
import { kindResolver } from '../kind';

const connector = new DbConnector();

describe('test kind resolvers', () => {
  let db: MongoClient;

  beforeAll(async () => {
    db = await connector.connect();
  });

  afterAll(async () => {
    await connector.disconnect();
  });

  it('search kind by id', async () => {
    const query = (_id: string) =>
      kindResolver.Query.kind(null, { _id }, { db });

    expect(await query('1')).toStrictEqual({
      id: 1,
      firstName: 'Tom',
      lastName: 'Coleman',
    });
    expect(await query('100000')).toBeUndefined();
  });
});
