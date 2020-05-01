import { MongoClient, ObjectID } from 'mongodb';
import { v4 as uuidv4 } from 'uuid';

import { DbConnector } from '../../connector';
import { Sample, SampleType } from '../sample.model';

const connector = new DbConnector();
const uuid = uuidv4();
const id = '5ea9eefc8d0d5c34e0f2fc57';
const sampleTest: SampleType = {
  _id: new ObjectID(id),
  uuid,
  title: 'test',
  status: [{ kind: 'test', date: new Date().toString() }],
  description: 'test description',
  comments: [
    {
      date: new Date().toString(),
      title: 'comment',
      description: 'comment description',
      user: 'test',
    },
  ],
  summary: [{ name: 'mean', value: '12', units: 'V' }],
};

describe('test sample model', () => {
  let db: MongoClient;

  beforeAll(async () => {
    db = await connector.connect();
  });

  afterAll(async () => {
    await connector.disconnect();
  });

  it('Basic CRD', async () => {
    // new empty collection
    const sample = new Sample(db);
    expect(await sample.getAll()).toHaveLength(0);
    expect(await sample.findById(id)).toBeNull();
    expect(await sample.findByUuid(uuid)).toBeNull();

    // insert one sample
    await sample.insertOne(sampleTest);
    expect(await sample.getAll()).toHaveLength(1);
    expect(await sample.findById(id)).toStrictEqual(sampleTest);
    expect(await sample.findById('5ea9eefc8d0d5c34e0f2fc58')).toBeNull();
    expect(await sample.findByUuid(uuid)).toStrictEqual(sampleTest);

    // unique id
    await expect(sample.insertOne(sampleTest)).rejects.toThrow(
      /duplicate key error dup key/,
    );

    // delete all
    await sample.empty();
    expect(await sample.getAll()).toHaveLength(0);
    expect(await sample.findById(id)).toBeNull();
  });
});
