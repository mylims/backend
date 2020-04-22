import { ApolloServer, gql } from 'apollo-server-fastify';
import { createTestClient } from 'apollo-server-testing';

import { DbConnector } from '../../connector';
import { resolvers } from '../../resolvers';
import { typeDefs } from '../../schemas';

// Mocked server
const dbConnection = new DbConnector();
const context = async () => ({ db: await dbConnection.connect() });
const server = new ApolloServer({ typeDefs, resolvers, context });
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

describe('Kind', () => {
  afterAll(async () => dbConnection.disconnect());

  describe('Kind by id', () => {
    it('empty case', async () => {
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
      expect(kind).toBeNull();
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

  // search kind by id
  const GET_NAME = gql`
    query kindByName($name: String!) {
      kindByName(name: $name) {
        name
        name
      }
    }
  `;

  describe('Kind by name', () => {
    it('empty case', async () => {
      const { data, errors } = await query({
        query: GET_NAME,
        variables: { name: 'test' },
      });
      // check no errors in the query
      expect(errors).toBeUndefined();
      expect(data).not.toBeUndefined();
      expect(data).not.toBeNull();

      // check that kind is in the response
      const { kindByName } = data || {};
      expect(kindByName).not.toBeUndefined();
      expect(kindByName).toHaveLength(0);
    });

    it('require name', async () => {
      // checks that the variables are send
      const res1 = await query({
        query: GET_NAME,
      });
      expect(res1.data).toBeUndefined();
      expect(res1.errors).not.toBeUndefined();

      // checks that the variable id is in the query
      const res2 = await query({
        query: GET_NAME,
        variables: { id: 'fail' },
      });
      expect(res2.data).toBeUndefined();
      expect(res2.errors).not.toBeUndefined();

      // checks that the variable id is in the query
      const res3 = await query({
        query: GET_NAME,
        variables: { name: 1 },
      });
      expect(res3.data).toBeUndefined();
      expect(res3.errors).not.toBeUndefined();
    });
  });
});
