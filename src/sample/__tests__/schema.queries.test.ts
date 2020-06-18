import { gql } from 'apollo-server-fastify';
import { createTestClient } from 'apollo-server-testing';

import { context } from '../../context';
import { createServer } from '../../index';
import { randomId } from '../../utils/fake';

// Mocked server
const server = createServer({ context });
const { query } = createTestClient(server);

afterAll(async () => server.stop());

const GET_ID = gql`
  query sample($id: String!) {
    sample(_id: $id) {
      _id
      title
    }
  }
`;

describe('Experiment single searchers', () => {
  it('empty case', async () => {
    const { data, errors } = await query({
      query: GET_ID,
      variables: { id: randomId(12) },
    });
    // check no errors in the query
    expect(errors).toBeUndefined();
    expect(data).not.toBeUndefined();
    expect(data).not.toBeNull();

    // check that sample is in the response
    const response = data && data.sample;
    expect(response).not.toBeUndefined();
    expect(response).toBeNull();
  });

  it('correct variables', async () => {
    // checks that the variables are send
    const res1 = await query({
      query: GET_ID,
    });
    expect(res1.data).toBeUndefined();
    expect(res1.errors).not.toBeUndefined();

    // checks that the variable id is not in the query
    const res2 = await query({
      query: GET_ID,
      variables: { name: 'fail' },
    });
    expect(res2.data).toBeUndefined();
    expect(res2.errors).not.toBeUndefined();

    // checks that the type variable is wrong
    const res3 = await query({
      query: GET_ID,
      variables: { id: 1 },
    });
    expect(res3.data).toBeUndefined();
    expect(res3.errors).not.toBeUndefined();
  });
});
