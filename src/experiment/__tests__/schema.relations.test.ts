import { gql } from 'apollo-server-fastify';
import {
  createTestClient,
  ApolloServerTestClient,
} from 'apollo-server-testing';
import { ObjectID, MongoClient } from 'mongodb';

import { Models } from '../../context';
import { createServer } from '../../index';
import { randomId } from '../../utils/fake';

// Mocked server
let query: ApolloServerTestClient['query'];
let mutate: ApolloServerTestClient['mutate'];
let models: Models;
let db: MongoClient;

const id = randomId(12);
const _id = new ObjectID(id);
const sample = { _id, codeId: id, title: 'sample test' };

beforeAll(async () => {
  const { server, context } = await createServer();
  const test = createTestClient(server);
  query = test.query;
  mutate = test.mutate;
  models = context.models;
  db = context.db;
  await models.sample.insertOne(sample);
});

afterAll(async () => {
  await models.sample.drop();
  return db.close();
});

const GET_ID = gql`
  query experiment($experimentId: String!) {
    experiment(_id: $experimentId) {
      _id
      title
      input {
        title
        _id
      }
    }
  }
`;

const CREATE = gql`
  mutation createExperiment($experiment: ExperimentInput!) {
    createExperiment(experiment: $experiment) {
      _id
      title
    }
  }
`;

const APPEND = gql`
  mutation appendExperimentInput($sampleId: String!, $experimentId: String!) {
    appendExperimentInput(sampleId: $sampleId, experimentId: $experimentId) {
      _id
      title
      input {
        title
        _id
      }
    }
  }
`;

describe('Experiment with a sample input', () => {
  it('Input creation', async () => {
    const res1 = await query({
      query: GET_ID,
      variables: { experimentId: randomId(12) },
    });

    // check no errors in the query
    expect(res1.errors).toBeUndefined();
    expect(res1.data).not.toBeUndefined();
    expect(res1.data).not.toBeNull();
    const data1 = res1.data || {};
    expect(data1.experiment).not.toBeUndefined();
    expect(data1.experiment).toBeNull();

    // Insert experiment
    const create = await mutate({
      mutation: CREATE,
      variables: { experiment: { title: 'test' } },
    });
    expect(create.errors).toBeUndefined();
    expect(create.data).not.toBeUndefined();
    expect(create.data).not.toBeNull();
    const data2 = create.data || {};
    expect(data2.createExperiment).not.toBeUndefined();
    expect(data2.createExperiment).toHaveProperty('_id');
    expect(data2.createExperiment.title).toBe('test');

    // Adds sample to an experiment
    const experimentId = data2.createExperiment._id;
    const update = await mutate({
      mutation: APPEND,
      variables: { experimentId, sampleId: id },
    });
    expect(update.errors).toBeUndefined();
    expect(update.data).not.toBeUndefined();
    expect(update.data).not.toBeNull();
    const data3 = update.data || {};
    expect(data3.appendExperimentInput).not.toBeUndefined();
    expect(data3.appendExperimentInput.input).toHaveLength(1);
  });

  it('False sample creation', async () => {
    const res1 = await query({
      query: GET_ID,
      variables: { experimentId: randomId(12) },
    });

    // check no errors in the query
    expect(res1.errors).toBeUndefined();
    expect(res1.data).not.toBeUndefined();
    expect(res1.data).not.toBeNull();
    const data1 = res1.data || {};
    expect(data1.experiment).not.toBeUndefined();
    expect(data1.experiment).toBeNull();

    // Insert experiment
    const create = await mutate({
      mutation: CREATE,
      variables: { experiment: { title: 'test' } },
    });
    expect(create.errors).toBeUndefined();
    expect(create.data).not.toBeUndefined();
    expect(create.data).not.toBeNull();
    const data2 = create.data || {};
    expect(data2.createExperiment).not.toBeUndefined();
    expect(data2.createExperiment).toHaveProperty('_id');
    expect(data2.createExperiment.title).toBe('test');

    // Adds sample to an experiment
    const experimentId = data2.createExperiment._id;
    const sampleId = randomId(12);
    const update = await mutate({
      mutation: APPEND,
      variables: { experimentId, sampleId },
    });
    const { errors: [error] = [], data: data3 } = update || {};
    const { appendExperimentInput } = data3 || {};
    expect(error.message).toBe(`Sample ${sampleId} doesn't exist`);
    expect(appendExperimentInput).toBeNull();
  });
});
