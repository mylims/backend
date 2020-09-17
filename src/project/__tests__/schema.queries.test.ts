import { gql } from 'apollo-server-fastify';
import {
  createTestClient,
  ApolloServerTestClient,
} from 'apollo-server-testing';
import { MongoClient } from 'mongodb';

import { createServer } from '../../index';
import { randomId } from '../../utils/fake';

// Mocked server
let query: ApolloServerTestClient['query'];
let db: MongoClient;

beforeAll(async () => {
  const { server, context } = await createServer();
  const test = createTestClient(server);
  query = test.query;
  db = context.db;
});

afterAll(() => db.close());

const GET_ID = gql`
  query experiment($id: String!) {
    experiment(_id: $id) {
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

    // check that experiment is in the response
    const response = data && data.experiment;
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
