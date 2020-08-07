import { MongoClient, ObjectID } from 'mongodb';

import { DbConnector } from '../../connector';
import { FileDbObject } from '../../generated/graphql';
import { randomId } from '../../utils/fake';
import { File } from '../file.model';

const connector = new DbConnector();
const id = randomId(24);
const fileTest: FileDbObject = {
  _id: new ObjectID(id),
  filename: 'test_file',
  mimetype: 'text/plain',
  hashname: randomId(12),
  creationDate: new Date().toString(),
};

describe('test file model', () => {
  let db: MongoClient;

  beforeAll(async () => {
    db = await connector.connect();
  });

  afterAll(async () => {
    await connector.disconnect();
  });

  it('Basic CRD', async () => {
    // new empty collection
    const file = new File(db);
    expect(await file.getAll()).toHaveLength(0);
    expect(await file.findById(id)).toBeNull();

    // insert one file
    await file.insertOne(fileTest);
    expect(await file.getAll()).toHaveLength(1);
    expect(await file.findById(id)).toStrictEqual(fileTest);
    expect(await file.findById(randomId(24))).toBeNull();

    // unique id
    await expect(file.insertOne(fileTest)).rejects.toThrow(
      /duplicate key error dup key/,
    );

    // delete all
    await file.drop();
    expect(await file.getAll()).toHaveLength(0);
    expect(await file.findById(id)).toBeNull();
  });
});
