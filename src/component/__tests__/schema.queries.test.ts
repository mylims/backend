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

// search component by id
const GET_ID = gql`
  query component($id: String!) {
    component(_id: $id) {
      _id
    }
  }
`;

describe('Kind', () => {
  describe('Kind by id', () => {
    it('empty case', async () => {
      const { data, errors } = await query({
        query: GET_ID,
        variables: { id: randomId(12) },
      });
      // check no errors in the query
      expect(errors).toBeUndefined();
      expect(data).not.toBeUndefined();
      expect(data).not.toBeNull();

      // check that component is in the response
      const { component } = data || {};
      expect(component).not.toBeUndefined();
      expect(component).toBeNull();
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
