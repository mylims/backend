import { gql } from 'apollo-server-fastify';
import { createTestClient } from 'apollo-server-testing';

import { context } from '../../context';
import { createServer } from '../../index';
import { randomId } from '../../utils/fake';

// Mocked server
const server = createServer({ context });
const { query, mutate } = createTestClient(server);

afterAll(async () => {
  const { models } = await context();
  await models.measurement.drop();
  return server.stop();
});

const GET_ID = gql`
  query measurement($id: String!) {
    measurement(_id: $id) {
      _id
      title
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

const UPDATE = gql`
  mutation updateMeasurement($id: String!, $measurement: MeasurementInput!) {
    updateMeasurement(_id: $id, measurement: $measurement) {
      _id
      description
    }
  }
`;

describe('Measurement single searchers', () => {
  it('Insertion', async () => {
    const res1 = await query({
      query: GET_ID,
      variables: { id: randomId(12) },
    });

    // check no errors in the query
    expect(res1.errors).toBeUndefined();
    expect(res1.data).not.toBeUndefined();
    expect(res1.data).not.toBeNull();
    const data1 = res1.data || {};
    expect(data1.measurement).not.toBeUndefined();
    expect(data1.measurement).toBeNull();

    // Insert measurement
    const measurement = {
      title: 'test',
      status: { kind: 'test', date: new Date().toString() },
    };
    const create = await mutate({
      mutation: CREATE,
      variables: { measurement },
    });
    expect(create.errors).toBeUndefined();
    expect(create.data).not.toBeUndefined();
    expect(create.data).not.toBeNull();
    const data2 = create.data || {};
    expect(data2.createMeasurement).not.toBeUndefined();
    expect(data2.createMeasurement).toHaveProperty('_id');
    expect(data2.createMeasurement.title).toBe('test');

    // Update measurement
    const id = data2.createMeasurement._id;
    const description = 'test update';
    const update = await mutate({
      mutation: UPDATE,
      variables: { id, measurement: { description } },
    });
    expect(update.errors).toBeUndefined();
    expect(update.data).not.toBeUndefined();
    expect(update.data).not.toBeNull();
    const data3 = update.data || {};
    expect(data3.updateMeasurement).not.toBeUndefined();
    expect(data3.updateMeasurement._id).toBe(id);
    expect(data3.updateMeasurement.description).toBe(description);
  });
});
