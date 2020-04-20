import { MongoClient } from 'mongodb';

import { DbConnector } from '../../connectors';
import { Kind } from '../kind';

const connector = new DbConnector();
const kindTest = { _id: '1', name: 'text', description: 'test kind' };

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
    expect(await kind.findByName('text')).toHaveLength(0);
    expect(await kind.findById('1')).toBeNull();

    // insert one kind
    await kind.insertOne(kindTest);
    expect(await kind.getAll()).toHaveLength(1);
    expect(await kind.findByName('empty')).toHaveLength(0);
    expect(await kind.findByName('text')).toHaveLength(1);
    expect(await kind.findByName('text')).toStrictEqual([kindTest]);
    expect(await kind.findById('1')).toStrictEqual(kindTest);
    expect(await kind.findById('2')).toBeNull();

    // unique id
    await expect(kind.insertOne(kindTest)).rejects.toThrow(
      /duplicate key error dup key/,
    );

    // delete all
    await kind.empty();
    expect(await kind.getAll()).toHaveLength(0);
    expect(await kind.findByName('text')).toHaveLength(0);
    expect(await kind.findById('1')).toBeNull();
  });
});
