import { MongoClient, ObjectID } from 'mongodb';

import { DbConnector } from '../../connector';
import { randomId } from '../../utils/fake';
import { Measurement, MeasurementType } from '../measurement.model';

const connector = new DbConnector();
const id = randomId(24);
const measurementTest: MeasurementType = {
  _id: new ObjectID(id),
  sample: randomId(24),
  title: 'test',
  description: 'test description',
  status: [{ kind: 'test', date: new Date().toString() }],
  startTime: new Date().toString(),
  endTime: new Date().toString(),
  content: { test: true },
};

describe('test measurement model', () => {
  let db: MongoClient;

  beforeAll(async () => {
    db = await connector.connect();
  });

  afterAll(async () => {
    await connector.disconnect();
  });

  it('Basic CRD', async () => {
    // new empty collection
    const measurement = new Measurement(db);
    expect(await measurement.getAll()).toHaveLength(0);
    expect(await measurement.findById(id)).toBeNull();

    // insert one measurement
    await measurement.insertOne(measurementTest);
    expect(await measurement.getAll()).toHaveLength(1);
    expect(await measurement.findById(id)).toStrictEqual(measurementTest);
    expect(await measurement.findById(randomId(12))).toBeNull();

    // unique id
    await expect(measurement.insertOne(measurementTest)).rejects.toThrow(
      /duplicate key error dup key/,
    );

    // delete all
    await measurement.empty();
    expect(await measurement.getAll()).toHaveLength(0);
    expect(await measurement.findById(id)).toBeNull();
  });
});
