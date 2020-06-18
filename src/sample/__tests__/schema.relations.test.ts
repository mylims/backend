import { gql } from 'apollo-server-fastify';
import { createTestClient } from 'apollo-server-testing';
import { ObjectID } from 'mongodb';

import { context } from '../../context';
import { createServer } from '../../index';
import { randomId } from '../../utils/fake';

// Mocked server
const server = createServer({ context });
const { query, mutate } = createTestClient(server);

const id = randomId(12);
const _id = new ObjectID(id);
const kind = { _id, name: 'kind' };
const component = { _id, kind: id };
const measurement = { _id, title: 'measurement' };

beforeAll(async () => {
  const { models } = await context();
  await models.kind.insertOne(kind);
  await models.component.insertOne(component);
  await models.measurement.insertOne(measurement);
});

afterAll(async () => {
  const { models } = await context();
  await models.measurement.drop();
  await models.component.drop();
  await models.kind.drop();
  return server.stop();
});

const GET_ID = gql`
  query sample($sampleId: String!) {
    sample(_id: $sampleId) {
      _id
      title
      components {
        kind {
          name
        }
      }
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

const ADD_COMPONENT = gql`
  mutation appendSampleComponent($sampleId: String!, $componentId: String!) {
    appendSampleComponent(componentId: $componentId, sampleId: $sampleId) {
      parent
      kind {
        name
      }
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

describe('Component relation', () => {
  it('Add a component', async () => {
    // Insert sample
    const create = await mutate({
      mutation: CREATE,
      variables: { sample: { title: 'test' } },
    });
    expect(create.errors).toBeUndefined();
    expect(create.data).not.toBeUndefined();
    expect(create.data).not.toBeNull();
    const data2 = create.data || {};
    expect(data2.createSample).not.toBeUndefined();
    expect(data2.createSample).toHaveProperty('_id');
    expect(data2.createSample.title).toBe('test');

    // Adds component to an sample
    const sampleId = data2.createSample._id;
    const update = await mutate({
      mutation: ADD_COMPONENT,
      variables: { sampleId, componentId: id },
    });
    expect(update.errors).toBeUndefined();
    expect(update.data).not.toBeUndefined();
    expect(update.data).not.toBeNull();
    const data3 = update.data || {};
    expect(data3.appendSampleComponent).not.toBeUndefined();
    expect(data3.appendSampleComponent.kind.name).toBe(kind.name);

    const res1 = await query({
      query: GET_ID,
      variables: { sampleId },
    });

    // check no errors in the query
    expect(res1.errors).toBeUndefined();
    expect(res1.data).not.toBeUndefined();
    expect(res1.data).not.toBeNull();
    const data1 = res1.data || {};
    expect(data1.sample).not.toBeUndefined();
    expect(data1.sample).not.toBeNull();
    expect(data1.sample.components).toHaveLength(1);
  });

  it('Nonexisting sample', async () => {
    const sampleId = randomId(12);
    const update = await mutate({
      mutation: ADD_COMPONENT,
      variables: { sampleId, componentId: id },
    });
    const [error] = update.errors || [];
    expect(update.errors).not.toBeUndefined();
    expect(error.message).toBe(`Sample ${sampleId} doesn't exist`);
  });

  it('Nonexisting component', async () => {
    // Insert sample
    const create = await mutate({
      mutation: CREATE,
      variables: { sample: { title: 'test' } },
    });
    expect(create.errors).toBeUndefined();
    expect(create.data).not.toBeUndefined();
    expect(create.data).not.toBeNull();
    const data2 = create.data || {};
    expect(data2.createSample).not.toBeUndefined();
    expect(data2.createSample).toHaveProperty('_id');
    expect(data2.createSample.title).toBe('test');

    // Adds sample to an sample
    const sampleId = data2.createSample._id;
    const componentId = randomId(12);
    const update = await mutate({
      mutation: ADD_COMPONENT,
      variables: { sampleId, componentId },
    });

    const [error] = update.errors || [];
    expect(update.errors).not.toBeUndefined();
    expect(error.message).toBe(`Component ${componentId} doesn't exist`);
  });
});

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
    const data2 = create.data || {};
    expect(data2.createSample).not.toBeUndefined();
    expect(data2.createSample).toHaveProperty('_id');
    expect(data2.createSample.title).toBe('measurement');

    // Adds measurement to an sample
    const sampleId = data2.createSample._id;
    const update = await mutate({
      mutation: ADD_MEASUREMENT,
      variables: { sampleId, measurementId: id },
    });
    expect(update.errors).toBeUndefined();
    expect(update.data).not.toBeUndefined();
    expect(update.data).not.toBeNull();
    const data3 = update.data || {};
    expect(data3.appendSampleMeasurement).not.toBeUndefined();

    const res1 = await query({
      query: GET_ID,
      variables: { sampleId },
    });

    // check no errors in the query
    expect(res1.errors).toBeUndefined();
    expect(res1.data).not.toBeUndefined();
    expect(res1.data).not.toBeNull();
    const data1 = res1.data || {};
    expect(data1.sample).not.toBeUndefined();
    expect(data1.sample).not.toBeNull();
    expect(data1.sample.measurements).toHaveLength(1);
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

  it('Nonexisting component', async () => {
    // Insert sample
    const create = await mutate({
      mutation: CREATE,
      variables: { sample: { title: 'test' } },
    });
    expect(create.errors).toBeUndefined();
    expect(create.data).not.toBeUndefined();
    expect(create.data).not.toBeNull();
    const data2 = create.data || {};
    expect(data2.createSample).not.toBeUndefined();
    expect(data2.createSample).toHaveProperty('_id');
    expect(data2.createSample.title).toBe('test');

    // Adds sample to an sample
    const sampleId = data2.createSample._id;
    const measurementId = randomId(12);
    const update = await mutate({
      mutation: ADD_MEASUREMENT,
      variables: { sampleId, measurementId },
    });

    const [error] = update.errors || [];
    expect(update.errors).not.toBeUndefined();
    expect(error.message).toBe(`Measurement ${measurementId} doesn't exist`);
  });
});
