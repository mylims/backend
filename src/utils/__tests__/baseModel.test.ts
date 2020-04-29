import { MongoClient, ObjectID } from 'mongodb';

import { DbConnector } from '../../connector';
import { Base } from '../base.model';

interface BaseTest {
  _id: string | ObjectID;
  name: string;
}

const connector = new DbConnector();
const id = '5ea9eefc8d0d5c34e0f2fc57';
const baseTest = { _id: new ObjectID(id), name: 'test' };

describe('Base model', () => {
  let db: MongoClient;

  beforeAll(async () => {
    db = await connector.connect();
  });

  afterAll(async () => {
    await connector.disconnect();
  });

  it('DB and collection names required', () => {
    const required = 'DB and collection names are required';
    expect(() => new Base<BaseTest>(db)).toThrow(required);
    expect(() => new Base<BaseTest>(db, 'test')).toThrow(required);
    expect(() => new Base<BaseTest>(db, 'test', '')).toThrow(required);
    expect(() => new Base<BaseTest>(db, '', 'test')).toThrow(required);
  });

  it('Simple flow', async () => {
    // new empty collection
    const base = new Base<BaseTest>(db, 'test', 'test');
    expect(await base.getAll()).toHaveLength(0);
    expect(await base.findById(id)).toBeNull();
    expect(await base.findOne({ name: 'test' })).toBeNull();
    expect(await base.findMany({ name: 'test' })).toHaveLength(0);

    // insert one base
    await base.insertOne(baseTest);
    expect(await base.getAll()).toHaveLength(1);
    expect(await base.findById(id)).toStrictEqual(baseTest);
    expect(await base.findById('5ea9eefc8d0d5c34e0f2fc58')).toBeNull();
    expect(await base.findOne({ name: 'test' })).toStrictEqual(baseTest);
    expect(await base.findMany({ name: 'test' })).toStrictEqual([baseTest]);

    // unique id
    await expect(base.insertOne(baseTest)).rejects.toThrow(
      /duplicate key error dup key/,
    );

    // update
    const { value: failed } = await base.updateOne('5ea9eefc8d0d5c34e0f2fc58', {
      name: 'updated',
    });
    expect(failed).toBeNull();

    const { value: success } = await base.updateOne(id, { name: 'updated' });
    expect(success).toStrictEqual({
      ...baseTest,
      name: 'updated',
    });

    // delete all
    await base.empty();
    expect(await base.getAll()).toHaveLength(0);
    expect(await base.findById(id)).toBeNull();
  });
});
