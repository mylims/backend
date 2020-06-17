import { MongoClient, ObjectID } from 'mongodb';

import { DbConnector } from '../../connector';
import { randomId } from '../../utils/fake';
import { Kind } from '../kind.model';

const connector = new DbConnector();
const id = randomId(24);
const kindTest = {
  _id: new ObjectID(id),
  name: 'text',
  description: 'test kind',
};

describe('test kind model', () => {
  let db: MongoClient;

  beforeAll(async () => {
    db = await connector.connect();
  });

  afterAll(async () => {
    await connector.disconnect();
  });

  it('Basic CRD', async () => {
    // new empty collection
    const kind = new Kind(db);
    expect(await kind.getAll()).toHaveLength(0);
    expect(await kind.findById(id)).toBeNull();

    // insert one kind
    await kind.insertOne(kindTest);
    expect(await kind.getAll()).toHaveLength(1);
    expect(await kind.findById(id)).toStrictEqual(kindTest);
    expect(await kind.findById(randomId(24))).toBeNull();

    // unique id
    await expect(kind.insertOne(kindTest)).rejects.toThrow(
      /duplicate key error dup key/,
    );

    // delete all
    await kind.drop();
    expect(await kind.getAll()).toHaveLength(0);
    expect(await kind.findById(id)).toBeNull();
  });
});
