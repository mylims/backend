import { MongoClient, ObjectID } from 'mongodb';

import { DbConnector } from '../../connector';
import { ProjectDbObject } from '../../generated/graphql';
import { randomId } from '../../utils/fake';
import { Project } from '../project.model';

const connector = new DbConnector();
const id = randomId(24);
const projectTest: ProjectDbObject = {
  _id: new ObjectID(id),
  title: 'test',
  description: 'test description',
  status: [{ kind: 'test', date: new Date().toString() }],
  meta: { test: true },
};

describe('test project model', () => {
  let db: MongoClient;

  beforeAll(async () => {
    db = await connector.connect();
    const project = new Project(db);
    await project.drop();
  });

  afterAll(async () => {
    const project = new Project(db);
    await project.drop();
    await connector.disconnect();
  });

  it('Basic CRD', async () => {
    // new empty collection
    const project = new Project(db);
    expect(await project.getAll()).toHaveLength(0);
    expect(await project.findById(id)).toBeNull();

    // insert one project
    await project.insertOne(projectTest);
    expect(await project.getAll()).toHaveLength(1);
    expect(await project.findById(id)).toStrictEqual(projectTest);
    expect(await project.findById(randomId(12))).toBeNull();

    // unique id
    await expect(project.insertOne(projectTest)).rejects.toThrow(
      /duplicate key error dup key/,
    );

    // delete all
    await project.drop();
    expect(await project.getAll()).toHaveLength(0);
    expect(await project.findById(id)).toBeNull();
  });
});
