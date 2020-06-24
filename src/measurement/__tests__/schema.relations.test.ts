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
const kind = { _id, name: 'kind' };
const component = { _id, kind: id };

beforeAll(async () => {
  const { server, context } = await createServer();
  const test = createTestClient(server);
  query = test.query;
  mutate = test.mutate;
  models = context.models;
  db = context.db;
  await models.kind.insertOne(kind);
  await models.component.insertOne(component);
});

afterAll(async () => {
  await models.measurement.drop();
  await models.component.drop();
  await models.kind.drop();
  return db.close();
});

const GET_ID = gql`
  query measurement($measurementId: String!) {
    measurement(_id: $measurementId) {
      _id
      title
      components {
        kind {
          name
        }
      }
    }
  }
`;

const CREATE = gql`
  mutation createMeasurement($measurement: MeasurementInput!) {
    createMeasurement(measurement: $measurement) {
      _id
      title
    }
  }
`;

const ADD_COMPONENT = gql`
  mutation appendMeasurementComponent(
    $measurementId: String!
    $componentId: String!
  ) {
    appendMeasurementComponent(
      componentId: $componentId
      measurementId: $measurementId
    ) {
      parent
      kind {
        name
      }
    }
  }
`;

describe('Component relation', () => {
  it('Add a component', async () => {
    // Insert measurement
    const create = await mutate({
      mutation: CREATE,
      variables: { measurement: { title: 'test' } },
    });
    expect(create.errors).toBeUndefined();
    expect(create.data).not.toBeUndefined();
    expect(create.data).not.toBeNull();
    const data2 = create.data || {};
    expect(data2.createMeasurement).not.toBeUndefined();
    expect(data2.createMeasurement).toHaveProperty('_id');
    expect(data2.createMeasurement.title).toBe('test');

    // Adds measurement to an measurement
    const measurementId = data2.createMeasurement._id;
    const update = await mutate({
      mutation: ADD_COMPONENT,
      variables: { measurementId, componentId: id },
    });
    expect(update.errors).toBeUndefined();
    expect(update.data).not.toBeUndefined();
    expect(update.data).not.toBeNull();
    const data3 = update.data || {};
    expect(data3.appendMeasurementComponent).not.toBeUndefined();
    expect(data3.appendMeasurementComponent.kind.name).toBe(kind.name);

    const res1 = await query({
      query: GET_ID,
      variables: { measurementId },
    });

    // check no errors in the query
    expect(res1.errors).toBeUndefined();
    expect(res1.data).not.toBeUndefined();
    expect(res1.data).not.toBeNull();
    const data1 = res1.data || {};
    expect(data1.measurement).not.toBeUndefined();
    expect(data1.measurement).not.toBeNull();
    expect(data1.measurement.components).toHaveLength(1);
  });

  it('Nonexisting measurement', async () => {
    const update = await mutate({
      mutation: ADD_COMPONENT,
      variables: { measurementId: id, componentId: id },
    });
    const [error] = update.errors || [];
    expect(update.errors).not.toBeUndefined();
    expect(error.message).toBe(`Measurement ${id} doesn't exist`);
  });

  it('Nonexisting component', async () => {
    // Insert measurement
    const create = await mutate({
      mutation: CREATE,
      variables: { measurement: { title: 'test' } },
    });
    expect(create.errors).toBeUndefined();
    expect(create.data).not.toBeUndefined();
    expect(create.data).not.toBeNull();
    const data2 = create.data || {};
    expect(data2.createMeasurement).not.toBeUndefined();
    expect(data2.createMeasurement).toHaveProperty('_id');
    expect(data2.createMeasurement.title).toBe('test');

    // Adds measurement to an measurement
    const measurementId = data2.createMeasurement._id;
    const componentId = randomId(12);
    const update = await mutate({
      mutation: ADD_COMPONENT,
      variables: { measurementId, componentId },
    });

    const [error] = update.errors || [];
    expect(update.errors).not.toBeUndefined();
    expect(error.message).toBe(`Component ${componentId} doesn't exist`);
  });
});
