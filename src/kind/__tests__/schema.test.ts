import { ApolloServer, gql } from 'apollo-server-fastify';
import { createTestClient } from 'apollo-server-testing';

import { typeDefs } from '../../schemas';

const mocks = {
  Int: () => 6,
  String: () => 'Hello',
  JSON: () => ({ test: true }),
};

// Mocked server
const server = new ApolloServer({ typeDefs, mocks, mockEntireSchema: false });
const { query } = createTestClient(server);

// search kind by id
const GET_ID = gql`
  query kind($id: String!) {
    kind(_id: $id) {
      _id
      name
    }
  }
`;

describe('Kind by id', () => {
  it('base case', async () => {
    const { data, errors } = await query({
      query: GET_ID,
      variables: { id: '1' },
    });
    // check no errors in the query
    expect(errors).toBeUndefined();
    expect(data).not.toBeUndefined();
    expect(data).not.toBeNull();

    // check that kind is in the response
    const { kind } = data || {};
    expect(kind).not.toBeUndefined();
    expect(kind).not.toBeNull();

    // check that the type values are right
    const { _id, name } = kind || {};
    expect(_id).toBe('Hello');
    expect(name).toBe('Hello');
  });

  it('require id', async () => {
    // checks that the variables are send
    const res1 = await query({
      query: GET_ID,
    });
    expect(res1.data).toBeUndefined();
    expect(res1.errors).not.toBeUndefined();

    // checks that the variable id is in the query
    const res2 = await query({
      query: GET_ID,
      variables: { name: 'fail' },
    });
    expect(res2.data).toBeUndefined();
    expect(res2.errors).not.toBeUndefined();

    // checks that the variable id is in the query
    const res3 = await query({
      query: GET_ID,
      variables: { id: 1 },
    });
    expect(res3.data).toBeUndefined();
    expect(res3.errors).not.toBeUndefined();
  });
});
