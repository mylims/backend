import { MongoClient, ObjectID } from 'mongodb';

import { DbConnector } from '../../connector';
import { ExperimentDbObject } from '../../generated/graphql';
import { randomId } from '../../utils/fake';
import { Experiment } from '../experiment.model';

const connector = new DbConnector();
const codeId = randomId(16);
const id = randomId(24);
const experimentTest: ExperimentDbObject = {
  _id: new ObjectID(id),
  codeId,
  title: 'test',
  description: 'test description',
  status: [{ kind: 'test', date: new Date().toString() }],
  meta: { test: true },
};

describe('test experiment model', () => {
  let db: MongoClient;

  beforeAll(async () => {
    db = await connector.connect();
    const experiment = new Experiment(db);
    await experiment.drop();
  });

  afterAll(async () => {
    const experiment = new Experiment(db);
    await experiment.drop();
    await connector.disconnect();
  });

  it('Basic CRD', async () => {
    // new empty collection
    const experiment = new Experiment(db);
    expect(await experiment.getAll()).toHaveLength(0);
    expect(await experiment.findById(id)).toBeNull();

    // insert one experiment
    await experiment.insertOne(experimentTest);
    expect(await experiment.getAll()).toHaveLength(1);
    expect(await experiment.findById(id)).toStrictEqual(experimentTest);
    expect(await experiment.findById(randomId(12))).toBeNull();

    // unique id
    await expect(experiment.insertOne(experimentTest)).rejects.toThrow(
      /duplicate key error dup key/,
    );

    // delete all
    await experiment.drop();
    expect(await experiment.getAll()).toHaveLength(0);
    expect(await experiment.findById(id)).toBeNull();
  });
});
