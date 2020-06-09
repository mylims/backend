import { ApolloServer, gql } from 'apollo-server-fastify';
import { createTestClient } from 'apollo-server-testing';
import { ObjectID } from 'mongodb';

import { Component } from '../../component/component.model';
import { DbConnector } from '../../connector';
import { Kind } from '../../kind/kind.model';
import { resolvers } from '../../resolvers';
import { Sample } from '../../sample/sample.model';
import { typeDefs } from '../../schemas';
import { randomId } from '../../utils/fake';

// Mocked server
const dbConnection = new DbConnector();
const context = async () => ({ db: await dbConnection.connect() });
const server = new ApolloServer({ typeDefs, resolvers, context });
const { query, mutate } = createTestClient(server);

const id = randomId(12);
const _id = new ObjectID(id);
const sample = { _id, codeId: id, title: 'sample test' };
const kind = { _id, name: 'kind' };
const component = { _id, kind: id };

beforeAll(async () => {
  const db = await dbConnection.connect();
  await new Sample(db).insertOne(sample);
  await new Kind(db).insertOne(kind);
  await new Component(db).insertOne(component);
});

afterAll(async () => {
  const db = await dbConnection.connect();
  await new Sample(db).empty();
  await new Component(db).empty();
  await new Kind(db).empty();
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
      components {
        kind {
          name
        }
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

const ADD_COMPONENT = gql`
  mutation appendExperimentComponent(
    $experimentId: String!
    $componentId: String!
  ) {
    appendExperimentComponent(
      componentId: $componentId
      experimentId: $experimentId
    ) {
      parent
      kind {
        name
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

describe('Component relation', () => {
  it('Add a component', async () => {
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
      mutation: ADD_COMPONENT,
      variables: { experimentId, componentId: id },
    });
    expect(update.errors).toBeUndefined();
    expect(update.data).not.toBeUndefined();
    expect(update.data).not.toBeNull();
    const data3 = update.data || {};
    expect(data3.appendExperimentComponent).not.toBeUndefined();
    expect(data3.appendExperimentComponent.kind.name).toBe(kind.name);

    const res1 = await query({
      query: GET_ID,
      variables: { experimentId },
    });

    // check no errors in the query
    expect(res1.errors).toBeUndefined();
    expect(res1.data).not.toBeUndefined();
    expect(res1.data).not.toBeNull();
    const data1 = res1.data || {};
    expect(data1.experiment).not.toBeUndefined();
    expect(data1.experiment).not.toBeNull();
    expect(data1.experiment.components).toHaveLength(1);
  });
});
