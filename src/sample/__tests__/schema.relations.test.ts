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
const measurement = { _id, title: 'measurement' };

beforeAll(async () => {
  const { server, context } = await createServer();
  const test = createTestClient(server);
  query = test.query;
  mutate = test.mutate;
  models = context.models;
  db = context.db;
  await models.measurement.insertOne(measurement);
});

afterAll(async () => {
  await models.measurement.drop();
  return db.close();
});

const GET_ID = gql`
  query sample($sampleId: String!) {
    sample(_id: $sampleId) {
      _id
      title
      measurements {
        title
      }
    }
  }
`;

const CREATE = gql`
  mutation createSample($sample: SampleInput!) {
    createSample(sample: $sample) {
      _id
      title
    }
  }
`;

const ADD_MEASUREMENT = gql`
  mutation appendSampleMeasurement(
    $sampleId: String!
    $measurementId: String!
  ) {
    appendSampleMeasurement(
      measurementId: $measurementId
      sampleId: $sampleId
    ) {
      sample
      title
    }
  }
`;

describe('Measurement relation', () => {
  it('Simple case', async () => {
    // Insert sample
    const create = await mutate({
      mutation: CREATE,
      variables: { sample: { title: 'measurement' } },
    });
    expect(create.errors).toBeUndefined();
    expect(create.data).not.toBeUndefined();
    expect(create.data).not.toBeNull();
    expect(create.data?.createSample).not.toBeUndefined();
    expect(create.data?.createSample).toHaveProperty('_id');
    expect(create.data?.createSample.title).toBe('measurement');

    // Adds measurement to an sample
    const sampleId = create.data?.createSample._id;
    const update = await mutate({
      mutation: ADD_MEASUREMENT,
      variables: { sampleId, measurementId: id },
    });
    expect(update.errors).toBeUndefined();
    expect(update.data).not.toBeUndefined();
    expect(update.data).not.toBeNull();
    expect(update.data?.appendSampleMeasurement).not.toBeUndefined();

    const res1 = await query({
      query: GET_ID,
      variables: { sampleId },
    });

    // check no errors in the query
    expect(res1.errors).toBeUndefined();
    expect(res1.data).not.toBeUndefined();
    expect(res1.data).not.toBeNull();
    expect(res1.data?.sample).not.toBeUndefined();
    expect(res1.data?.sample).not.toBeNull();
    expect(res1.data?.sample.measurements).toHaveLength(1);
  });

  it('Nonexisting sample', async () => {
    const sampleId = randomId(12);
    const update = await mutate({
      mutation: ADD_MEASUREMENT,
      variables: { sampleId, measurementId: id },
    });
    const [error] = update.errors || [];
    expect(update.errors).not.toBeUndefined();
    expect(error.message).toBe(`Sample ${sampleId} doesn't exist`);
  });
});
