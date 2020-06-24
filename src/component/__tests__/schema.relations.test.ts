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

const kindId = randomId(12);
const kind = {
  _id: new ObjectID(kindId),
  name: 'test area',
  description: '(test == text) area',
};

beforeAll(async () => {
  const { server, context } = await createServer();
  const test = createTestClient(server);
  query = test.query;
  mutate = test.mutate;
  models = context.models;
  db = context.db;
  await models.kind.insertOne(kind);
});

afterAll(async () => {
  await models.kind.drop();
  return db.close();
});

const GET_ID = gql`
  query component($componentId: String!) {
    component(_id: $componentId) {
      _id
      kind {
        name
      }
      input {
        kind {
          name
        }
      }
    }
  }
`;

const CREATE = gql`
  mutation createComponent($component: ComponentInput!) {
    createComponent(component: $component) {
      _id
      kind {
        _id
        name
      }
    }
  }
`;

const APPEND = gql`
  mutation appendComponentInput($parentId: String!, $childId: String!) {
    appendComponentInput(parentId: $parentId, childId: $childId) {
      _id
      content
      input {
        content
      }
    }
  }
`;

const REMOVE = gql`
  mutation removeComponentInput($parentId: String!, $childId: String!) {
    removeComponentInput(parentId: $parentId, childId: $childId) {
      _id
      content
      input {
        content
      }
    }
  }
`;

describe('Component with a kind', () => {
  it('Create a kind relation', async () => {
    const res1 = await query({
      query: GET_ID,
      variables: { componentId: randomId(12) },
    });

    // check no errors in the query
    expect(res1.errors).toBeUndefined();
    expect(res1.data).not.toBeUndefined();
    expect(res1.data).not.toBeNull();
    const data1 = res1.data || {};
    expect(data1.component).not.toBeUndefined();
    expect(data1.component).toBeNull();

    // Insert component
    const component = { kind: kindId, content: { title: 'test' } };
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
    const { name } = data2.createComponent.kind;
    expect(name).toBe(kind.name);
  });

  it('False kind creation', async () => {
    const res1 = await query({
      query: GET_ID,
      variables: { componentId: randomId(12) },
    });

    // check no errors in the query
    expect(res1.errors).toBeUndefined();
    expect(res1.data).not.toBeUndefined();
    expect(res1.data).not.toBeNull();
    const data1 = res1.data || {};
    expect(data1.component).not.toBeUndefined();
    expect(data1.component).toBeNull();

    // Insert component
    const fakeId = randomId(12);
    const component = { kind: fakeId, content: { title: 'test' } };
    const { errors: [error] = [], data: data2 } = await mutate({
      mutation: CREATE,
      variables: { component },
    });
    const { createComponent } = data2 || {};
    expect(error.message).toBe(`Kind ${fakeId} doesn't exists`);
    expect(createComponent).toBeNull();
  });
});

describe('Append input', () => {
  it('Create an input to a component', async () => {
    // Insert component
    const component = { kind: kindId, content: { title: 'parent' } };
    const create1 = await mutate({
      mutation: CREATE,
      variables: { component },
    });
    expect(create1.errors).toBeUndefined();
    expect(create1.data).not.toBeUndefined();
    expect(create1.data).not.toBeNull();
    const data1 = create1.data || {};
    expect(data1.createComponent).not.toBeUndefined();
    expect(data1.createComponent).toHaveProperty('_id');
    const { name } = data1.createComponent.kind;
    expect(name).toBe(kind.name);

    // Insert child component
    const child = { kind: kindId, content: { title: 'child' } };
    const create2 = await mutate({
      mutation: CREATE,
      variables: { component: child },
    });
    expect(create2.errors).toBeUndefined();
    expect(create2.data).not.toBeUndefined();
    expect(create2.data).not.toBeNull();
    const data2 = create2.data || {};
    expect(data2.createComponent).not.toBeUndefined();
    expect(data2.createComponent).toHaveProperty('_id');

    // Add relation
    const { _id: parentId } = data1.createComponent;
    const { _id: childId } = data2.createComponent;
    const append = await mutate({
      mutation: APPEND,
      variables: { parentId, childId },
    });
    expect(append.errors).toBeUndefined();
    expect(append.data).not.toBeUndefined();
    expect(append.data).not.toBeNull();
    const data3 = append.data || {};
    expect(data3.appendComponentInput).not.toBeUndefined();
    expect(data3.appendComponentInput).toHaveProperty('_id');
    expect(data3.appendComponentInput.content).toStrictEqual({
      title: 'parent',
    });
    expect(data3.appendComponentInput.input).toHaveLength(1);

    // Removes relation
    const remove = await mutate({
      mutation: REMOVE,
      variables: { parentId, childId },
    });
    expect(remove.errors).toBeUndefined();
    expect(remove.data).not.toBeUndefined();
    expect(remove.data).not.toBeNull();
    const data4 = remove.data || {};
    expect(data4.removeComponentInput).not.toBeUndefined();
    expect(data4.removeComponentInput).toHaveProperty('_id');
    expect(data4.removeComponentInput.content).toStrictEqual({
      title: 'parent',
    });
    expect(data4.removeComponentInput.input).toHaveLength(0);
  });

  it('False kind creation', async () => {
    // Insert component
    const component = { kind: kindId, content: { title: 'parent' } };
    const create1 = await mutate({
      mutation: CREATE,
      variables: { component },
    });
    expect(create1.errors).toBeUndefined();
    expect(create1.data).not.toBeUndefined();
    expect(create1.data).not.toBeNull();
    const data1 = create1.data || {};
    expect(data1.createComponent).not.toBeUndefined();
    expect(data1.createComponent).toHaveProperty('_id');
    const { name } = data1.createComponent.kind;
    expect(name).toBe(kind.name);
    const { _id: parentId } = data1.createComponent;

    // nonexisting insert component
    const childId = randomId(12);
    const { errors: [error] = [], data: data2 } = await mutate({
      mutation: APPEND,
      variables: { parentId, childId },
    });
    const { appendComponentInput } = data2 || {};
    expect(error.message).toBe(`Component ${childId} doesn't exist`);
    expect(appendComponentInput).toBeNull();
  });
});
