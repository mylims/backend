import { MongoClient } from 'mongodb';
import { v4 as uuidv4 } from 'uuid';

import { DbConnector } from '../../connector';
import { Experiment } from '../experiment.model';

const connector = new DbConnector();
const experimentTest = {
  _id: '1',
  uuid: uuidv4(),
  codeId: uuidv4(),
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

    // insert one experiment
    await experiment.insertOne(experimentTest);
    expect(await experiment.getAll()).toHaveLength(1);
    expect(await experiment.findById('1')).toStrictEqual(experimentTest);
    expect(await experiment.findById('2')).toBeNull();

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
