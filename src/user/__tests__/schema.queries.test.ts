import { gql } from 'apollo-server-fastify';
import {
  createTestClient,
  ApolloServerTestClient,
} from 'apollo-server-testing';
import { MongoClient } from 'mongodb';

import { Models } from '../../context';
import { createServer } from '../../index';

// Mocked server
let query: ApolloServerTestClient['query'];
let models: Models;
let db: MongoClient;

beforeAll(async () => {
  const { server, context } = await createServer();
  const test = createTestClient(server);
  query = test.query;
  models = context.models;
  db = context.db;
});

afterAll(async () => {
  const { user } = models;
  await user.drop();
  return db.close();
});

// search user by id
const GET_ID = gql`
  query user($id: String!) {
    user(_id: $id) {
      _id
      name
    }
  }
`;

describe('Kind', () => {
  describe('Kind by id', () => {
    it('empty case', async () => {
      const { data, errors } = await query({
        query: GET_ID,
        variables: { id: '5ea9eefc8d0d5c34e0f2fc57' },
      });
      // check no errors in the query
      expect(errors).toBeUndefined();
      expect(data).not.toBeUndefined();
      expect(data).not.toBeNull();

      // check that user is in the response
      const { user } = data || {};
      expect(user).not.toBeUndefined();
      expect(user).toBeNull();
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
});
