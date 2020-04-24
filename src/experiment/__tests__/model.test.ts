import { MongoClient } from 'mongodb';
import { v4 as uuidv4 } from 'uuid';

import { DbConnector } from '../../connector';
import { Experiment } from '../experiment.model';

const connector = new DbConnector();
const uuid = uuidv4();
const experimentTest = {
  _id: '1',
  uuid,
  codeId: uuid,
  owners: ['1'],
  tags: ['test'],
  title: 'test',
  description: 'test description',
  creationDate: new Date().toString(),
  status: [{ kind: 'test', date: new Date().toString() }],
  meta: { test: true },
  input: ['1'],
  output: ['2'],
};

describe('test experiment model', () => {
  let db: MongoClient;

  beforeAll(async () => {
    db = await connector.connect();
  });

  afterAll(async () => {
    await connector.disconnect();
  });

  it('Basic CRD', async () => {
    // new empty collection
    const experiment = new Experiment(db);
    expect(await experiment.getAll()).toHaveLength(0);
    expect(await experiment.findById('1')).toBeNull();
    expect(await experiment.findByCodeId(uuid)).toBeNull();
    expect(await experiment.findByUuid(uuid)).toBeNull();
    expect(await experiment.findByOwner('1')).toHaveLength(0);
    expect(await experiment.findByTag('test')).toHaveLength(0);

    // insert one experiment
    await experiment.insertOne(experimentTest);
    expect(await experiment.getAll()).toHaveLength(1);
    expect(await experiment.findById('1')).toStrictEqual(experimentTest);
    expect(await experiment.findById('2')).toBeNull();
    expect(await experiment.findByCodeId(uuid)).toStrictEqual(experimentTest);
    expect(await experiment.findByUuid(uuid)).toStrictEqual(experimentTest);
    expect(await experiment.findByOwner('1')).toStrictEqual([experimentTest]);
    expect(await experiment.findByTag('test')).toStrictEqual([experimentTest]);

    // unique id
    await expect(experiment.insertOne(experimentTest)).rejects.toThrow(
      /duplicate key error dup key/,
    );

    // delete all
    await experiment.empty();
    expect(await experiment.getAll()).toHaveLength(0);
    expect(await experiment.findById('1')).toBeNull();
  });
});
