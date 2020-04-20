import { MongoClient } from 'mongodb';

import { DbConnector } from '../../connectors';
import { Kind } from '../../models/kind';
import { kindResolver } from '../kind';

const connector = new DbConnector();
const kindTest = { _id: '1', name: 'text', description: 'test kind' };

describe('test kind resolvers', () => {
  let db: MongoClient;
  let kindModel: Kind;

  beforeAll(async () => {
    db = await connector.connect();
    kindModel = new Kind(db);
  });

  afterEach(async () => {
    await kindModel.empty();
  });

  afterAll(async () => {
    await connector.disconnect();
  });

  it('search kind by id', async () => {
    const kindById = (_id: string) =>
      kindResolver.Query.kind(null, { _id }, { db });

    expect(await kindById('1')).toBeNull();
    await kindModel.insertOne(kindTest);
    expect(await kindById('1')).toStrictEqual(kindTest);
  });

  it('search kind by name', async () => {
    const kindByName = (name: string) =>
      kindResolver.Query.kindByName(null, { name }, { db });

    expect(await kindByName('text')).toStrictEqual([]);
    await kindModel.insertOne(kindTest);
    expect(await kindByName('text')).toStrictEqual([kindTest]);
  });
});
