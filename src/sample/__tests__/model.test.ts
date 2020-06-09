import { MongoClient, ObjectID } from 'mongodb';

import { DbConnector } from '../../connector';
import { randomId } from '../../utils/fake';
import { Sample, SampleType } from '../sample.model';

const connector = new DbConnector();
const id = randomId(24);
const sampleTest: SampleType = {
  _id: new ObjectID(id),
  codeId: id,
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
    expect(await sample.findByCodeId(id)).toBeNull();

    // insert one sample
    await sample.insertOne(sampleTest);
    expect(await sample.getAll()).toHaveLength(1);
    expect(await sample.findById(id)).toStrictEqual(sampleTest);
    expect(await sample.findByCodeId(id)).toStrictEqual(sampleTest);
    expect(await sample.findById(randomId(12))).toBeNull();

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
