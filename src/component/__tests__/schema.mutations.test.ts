import { gql } from 'apollo-server-fastify';
import { createTestClient } from 'apollo-server-testing';
import { ObjectID } from 'mongodb';

import { context } from '../../context';
import { createServer } from '../../index';
import { randomId } from '../../utils/fake';

// Mocked server
const server = createServer({ context });
const { query, mutate } = createTestClient(server);

const kindId = randomId(12);
const kind = {
  _id: new ObjectID(kindId),
  name: 'test area',
  description: '(test == text) area',
};

beforeAll(async () => {
  const { models } = await context();
  await models.kind.insertOne(kind);
});

afterAll(async () => {
  const { models } = await context();
  await models.kind.drop();
  await models.component.drop();
  return server.stop();
});

const GET_ID = gql`
  query component($id: String!) {
    component(_id: $id) {
      _id
    }
  }
`;

const CREATE = gql`
  mutation createComponent($component: ComponentInput!) {
    createComponent(component: $component) {
      _id
    }
  }
`;

const UPDATE = gql`
  mutation updateComponent($id: String!, $content: JSON!) {
    updateComponent(_id: $id, content: $content) {
      _id
      content
    }
  }
`;

describe('Component single searchers', () => {
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
    expect(data1.component).not.toBeUndefined();
    expect(data1.component).toBeNull();

    // Insert component
    const component = { kind: kindId };
    const create = await mutate({
      mutation: CREATE,
      variables: { component },
    });
    expect(create.errors).toBeUndefined();
    expect(create.data).not.toBeUndefined();
    expect(create.data).not.toBeNull();
    const data2 = create.data || {};
    expect(data2.createComponent).not.toBeUndefined();
    expect(data2.createComponent).toHaveProperty('_id');

    // Update component
    const id = data2.createComponent._id;
    const content = { value: 'test update' };
    const update = await mutate({
      mutation: UPDATE,
      variables: { id, content },
    });
    expect(update.errors).toBeUndefined();
    expect(update.data).not.toBeUndefined();
    expect(update.data).not.toBeNull();
    const data3 = update.data || {};
    expect(data3.updateComponent).not.toBeUndefined();
    expect(data3.updateComponent._id).toBe(id);
  });
});
