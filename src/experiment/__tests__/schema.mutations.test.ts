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
  await models.experiment.drop();
  return server.stop();
});

const GET_ID = gql`
  query experiment($id: String!) {
    experiment(_id: $id) {
      _id
      title
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

const UPDATE = gql`
  mutation updateExperiment($id: String!, $experiment: ExperimentInput!) {
    updateExperiment(_id: $id, experiment: $experiment) {
      _id
      description
    }
  }
`;

describe('Experiment single searchers', () => {
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

    // Update experiment
    const id = data2.createExperiment._id;
    const description = 'test update';
    const update = await mutate({
      mutation: UPDATE,
      variables: { id, experiment: { description } },
    });
    expect(update.errors).toBeUndefined();
    expect(update.data).not.toBeUndefined();
    expect(update.data).not.toBeNull();
    const data3 = update.data || {};
    expect(data3.updateExperiment).not.toBeUndefined();
    expect(data3.updateExperiment._id).toBe(id);
    expect(data3.updateExperiment.description).toBe(description);
  });
});
