import { gql } from 'apollo-server-fastify';
import { createTestClient } from 'apollo-server-testing';

import { context } from '../../context';
import { Kind as KindType } from '../../generated/graphql';
import { createServer } from '../../index';
import { randomId } from '../../utils/fake';

// Mocked server
const server = createServer({ context });
const { query, mutate } = createTestClient(server);

afterAll(async () => {
  const {
    models: { kind },
  } = await context();
  await kind.drop();
  return server.stop();
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
  mutation updateKind($id: String!, $kind: KindInput!) {
    updateKind(_id: $id, kind: $kind) {
      _id
      name
    }
  }
`;

describe('Kind single searchers', () => {
  it('Insertion', async () => {
    const res1 = await query({
      query: GET_ID,
      variables: { id: randomId(24) },
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
      variables: { id, kind: { name } },
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
