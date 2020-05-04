import { ApolloServer, gql } from 'apollo-server-fastify';
import { createTestClient } from 'apollo-server-testing';

import { DbConnector } from '../../connector';
import { resolvers } from '../../resolvers';
import { typeDefs } from '../../schemas';
import { Kind, KindType } from '../kind.model';

// Mocked server
const dbConnection = new DbConnector();
const context = async () => ({ db: await dbConnection.connect() });
const server = new ApolloServer({ typeDefs, resolvers, context });
const { query, mutate } = createTestClient(server);

afterAll(async () => {
  const db = await dbConnection.connect();
  const exp = new Kind(db);
  await exp.empty();
  await dbConnection.disconnect();
});

const GET_ID = gql`
  query kind($id: String!) {
    kind(_id: $id) {
      _id
      name
    }
  }
`;

const CREATE = gql`
  mutation createKind($kind: KindInput!) {
    createKind(kind: $kind) {
      _id
      name
    }
  }
`;

const UPDATE = gql`
  mutation updateKind($id: String!, $name: String!) {
    updateKind(_id: $id, name: $name) {
      _id
      name
    }
  }
`;

describe('Kind single searchers', () => {
  it('Insertion', async () => {
    const res1 = await query({
      query: GET_ID,
      variables: { id: '5ea9f58a2ce4513727579aba' },
    });

    // check no errors in the query
    expect(res1.errors).toBeUndefined();
    expect(res1.data).not.toBeUndefined();
    expect(res1.data).not.toBeNull();
    const data1 = res1.data || {};
    expect(data1.kind).not.toBeUndefined();
    expect(data1.kind).toBeNull();

    // Insert kind
    const kind: Partial<KindType> = {
      name: 'test',
      schema: [{ name: 'field', type: 'string', required: true }],
    };
    const create = await mutate({
      mutation: CREATE,
      variables: { kind },
    });
    expect(create.errors).toBeUndefined();
    expect(create.data).not.toBeUndefined();
    expect(create.data).not.toBeNull();
    const data2 = create.data || {};
    expect(data2.createKind).not.toBeUndefined();
    expect(data2.createKind).toHaveProperty('_id');
    expect(data2.createKind.name).toBe('test');

    // Update kind
    const id = data2.createKind._id;
    const name = 'test update';
    const update = await mutate({
      mutation: UPDATE,
      variables: { id, name },
    });
    expect(update.errors).toBeUndefined();
    expect(update.data).not.toBeUndefined();
    expect(update.data).not.toBeNull();
    const data3 = update.data || {};
    expect(data3.updateKind).not.toBeUndefined();
    expect(data3.updateKind._id).toBe(id);
    expect(data3.updateKind.name).toBe(name);
  });
});
