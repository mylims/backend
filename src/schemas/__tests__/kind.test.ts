import { ApolloServer, gql } from 'apollo-server-fastify';
import { createTestClient } from 'apollo-server-testing';

import { typeDefs } from '../index';

const server = new ApolloServer({ typeDefs, mocks: true });

const GET_ID = gql`
  query kind($id: String!) {
    kind(_id: $id) {
      _id
      name
    }
  }
`;

const { query } = createTestClient(server);

describe('Kind by id', () => {
  it('base case', async () => {
    const { data, errors } = await query({
      query: GET_ID,
      variables: { id: '1' },
    });
    expect(errors).toBeUndefined();
    expect(data).not.toBeUndefined();
    expect(data).not.toBeNull();

    const { kind } = data || {};
    expect(kind).not.toBeUndefined();
    expect(kind).not.toBeNull();

    const { _id, name } = kind || {};
    expect(_id).not.toBeUndefined();
    expect(_id).not.toBeNull();
    expect(typeof _id).toBe('string');
    expect(name).not.toBeUndefined();
    expect(name).not.toBeNull();
    expect(typeof name).toBe('string');
  });

  it('require id', async () => {
    const res1 = await query({
      query: GET_ID,
    });
    expect(res1.data).toBeUndefined();
    expect(res1.errors).not.toBeUndefined();

    const res2 = await query({
      query: GET_ID,
      variables: { name: 'fail' },
    });
    expect(res2.data).toBeUndefined();
    expect(res2.errors).not.toBeUndefined();
  });
});
