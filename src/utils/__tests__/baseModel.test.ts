import { MongoClient } from 'mongodb';

import { DbConnector } from '../../connector';
import { Base } from '../base.model';

interface BaseTest {
  _id: string;
  name: string;
}

const connector = new DbConnector();
const baseTest = { _id: '1', name: 'test' };

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
    expect(await base.findById('1')).toBeNull();

    // insert one base
    await base.insertOne(baseTest);
    expect(await base.getAll()).toHaveLength(1);
    expect(await base.findById('1')).toStrictEqual(baseTest);
    expect(await base.findById('2')).toBeNull();

    // unique id
    await expect(base.insertOne(baseTest)).rejects.toThrow(
      /duplicate key error dup key/,
    );

    // delete all
    await base.empty();
    expect(await base.getAll()).toHaveLength(0);
    expect(await base.findById('1')).toBeNull();
  });
});
