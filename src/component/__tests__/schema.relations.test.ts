import { ApolloServer, gql } from 'apollo-server-fastify';
import { createTestClient } from 'apollo-server-testing';
import { ObjectID } from 'mongodb';

import { DbConnector } from '../../connector';
import { Kind } from '../../kind/kind.model';
import { resolvers } from '../../resolvers';
import { typeDefs } from '../../schemas';

// Mocked server
const dbConnection = new DbConnector();
const context = async () => ({ db: await dbConnection.connect() });
const server = new ApolloServer({ typeDefs, resolvers, context });
const { query, mutate } = createTestClient(server);

const kindId = '123456789abc';
const kind = {
  _id: new ObjectID(kindId),
  name: 'test area',
  description: '(test == text) area',
};

beforeEach(async () => {
  const db = await dbConnection.connect();
  const exp = new Kind(db);
  await exp.insertOne(kind);
});

afterEach(async () => {
  const db = await dbConnection.connect();
  const exp = new Kind(db);
  await exp.empty();
});

afterAll(async () => dbConnection.disconnect());

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

describe('Component with a kind', () => {
  it('Create a kind relation', async () => {
    const res1 = await query({
      query: GET_ID,
      variables: { componentId: '5ea9f58a2ce4513727579aba' },
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
      variables: { componentId: '5ea9f58a2ce4513727579aba' },
    });

    // check no errors in the query
    expect(res1.errors).toBeUndefined();
    expect(res1.data).not.toBeUndefined();
    expect(res1.data).not.toBeNull();
    const data1 = res1.data || {};
    expect(data1.component).not.toBeUndefined();
    expect(data1.component).toBeNull();

    // Insert component
    const component = { kind: 'cba987654321', content: { title: 'test' } };
    const { errors: [error] = [], data: data2 } = await mutate({
      mutation: CREATE,
      variables: { component },
    });
    const { createComponent } = data2 || {};
    expect(error.message).toBe("Kind cba987654321 doesn't exists");
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
    const { errors: [error] = [], data: data2 } = await mutate({
      mutation: APPEND,
      variables: { parentId, childId: '123456789abc' },
    });
    const { appendComponentInput } = data2 || {};
    expect(error.message).toBe("Component 123456789abc doesn't exist");
    expect(appendComponentInput).toBeNull();
  });
});
