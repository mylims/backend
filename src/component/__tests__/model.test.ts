import { MongoClient, ObjectID } from 'mongodb';

import { DbConnector } from '../../connector';
import { randomId } from '../../utils/fake';
import { Component } from '../component.model';

const connector = new DbConnector();
const id = randomId(24);
const componentTest = {
  _id: new ObjectID(id),
  kind: 'text',
  description: 'test component',
};

describe('test component model', () => {
  let db: MongoClient;

  beforeAll(async () => {
    db = await connector.connect();
    await new Component(db).empty();
  });

  afterAll(async () => {
    await connector.disconnect();
  });

  it('Basic CRD', async () => {
    // new empty collection
    const component = new Component(db);
    expect(await component.getAll()).toHaveLength(0);
    expect(await component.findById(id)).toBeNull();

    // insert one component
    await component.insertOne(componentTest);
    expect(await component.findById(id)).toStrictEqual(componentTest);
    expect(await component.findById(randomId(12))).toBeNull();

    // unique id
    await expect(component.insertOne(componentTest)).rejects.toThrow(
      /duplicate key error dup key/,
    );

    // delete all
    await component.empty();
    expect(await component.getAll()).toHaveLength(0);
    expect(await component.findById(id)).toBeNull();
  });
});
