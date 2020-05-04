import { ApolloServer, gql } from 'apollo-server-fastify';
import { createTestClient } from 'apollo-server-testing';
import { ObjectID } from 'mongodb';

import { DbConnector } from '../../connector';
import { resolvers } from '../../resolvers';
import { Sample } from '../../sample/sample.model';
import { typeDefs } from '../../schemas';

// Mocked server
const dbConnection = new DbConnector();
const context = async () => ({ db: await dbConnection.connect() });
const server = new ApolloServer({ typeDefs, resolvers, context });
const { query, mutate } = createTestClient(server);

const sampleId = '123456789abc';
const sample = {
  title: 'sample test',
  _id: new ObjectID(sampleId),
};

beforeAll(async () => {
  const db = await dbConnection.connect();
  const exp = new Sample(db);
  await exp.insertOne(sample);
});

afterAll(async () => {
  const db = await dbConnection.connect();
  const exp = new Sample(db);
  await exp.empty();
  await dbConnection.disconnect();
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
  mutation appendInput($sampleId: String!, $experimentId: String!) {
    appendInput(sampleId: $sampleId, experimentId: $experimentId) {
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
      variables: { experimentId: '5ea9f58a2ce4513727579aba' },
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
      variables: { experimentId, sampleId },
    });
    expect(update.errors).toBeUndefined();
    expect(update.data).not.toBeUndefined();
    expect(update.data).not.toBeNull();
    const data3 = update.data || {};
    expect(data3.appendInput).not.toBeUndefined();
    expect(data3.appendInput.input).toHaveLength(1);
  });

  it('False sample creation', async () => {
    const res1 = await query({
      query: GET_ID,
      variables: { experimentId: '5ea9f58a2ce4513727579aba' },
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
      variables: { experimentId, sampleId: 'cba987654321' },
    });
    const { errors: [error] = [], data: data3 } = update || {};
    const { appendInput } = data3 || {};
    expect(error.message).toBe("Sample cba987654321 doesn't exist");
    expect(appendInput).toBeNull();
  });
});
