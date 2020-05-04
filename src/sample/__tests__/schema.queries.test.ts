import { ApolloServer, gql } from 'apollo-server-fastify';
import { createTestClient } from 'apollo-server-testing';
import { DocumentNode } from 'graphql';

import { DbConnector } from '../../connector';
import { resolvers } from '../../resolvers';
import { typeDefs } from '../../schemas';

// Mocked server
const dbConnection = new DbConnector();
const context = async () => ({ db: await dbConnection.connect() });
const server = new ApolloServer({ typeDefs, resolvers, context });
const { query } = createTestClient(server);

afterAll(async () => dbConnection.disconnect());
interface Map {
  [k: string]: string | number;
}
type Cases = Array<[DocumentNode, string, Map, Map, Map]>;

const GET_ID = gql`
  query sample($id: String!) {
    sample(_id: $id) {
      _id
      title
    }
  }
`;

const singleCases: Cases = [
  [
    GET_ID,
    'sample',
    { id: '5ea9eefc8d0d5c34e0f2fc57' },
    { name: 'fail' },
    { id: 1 },
  ],
];

describe.each(singleCases)(
  'Experiment single searchers',
  (querySearch, title, successful, notRequired, wrongType) => {
    test(`${title}: empty case`, async () => {
      const { data, errors } = await query({
        query: querySearch,
        variables: successful,
      });
      // check no errors in the query
      expect(errors).toBeUndefined();
      expect(data).not.toBeUndefined();
      expect(data).not.toBeNull();

      // check that sample is in the response
      const response = data && data[title];
      expect(response).not.toBeUndefined();
      expect(response).toBeNull();
    });

    test(`${title}: correct variables`, async () => {
      // checks that the variables are send
      const res1 = await query({
        query: querySearch,
      });
      expect(res1.data).toBeUndefined();
      expect(res1.errors).not.toBeUndefined();

      // checks that the variable id is not in the query
      const res2 = await query({
        query: querySearch,
        variables: notRequired,
      });
      expect(res2.data).toBeUndefined();
      expect(res2.errors).not.toBeUndefined();

      // checks that the type variable is wrong
      const res3 = await query({
        query: querySearch,
        variables: wrongType,
      });
      expect(res3.data).toBeUndefined();
      expect(res3.errors).not.toBeUndefined();
    });
  },
);

const GET_TITLE = gql`
  query sampleByTitle($title: String!) {
    sampleByTitle(title: $title) {
      title
      description
    }
  }
`;
const multipleCases: Cases = [
  [
    GET_TITLE,
    'sampleByTitle',
    { title: 'test' },
    { name: 'fail' },
    { title: 1 },
  ],
];

describe.each(multipleCases)(
  'Experiment multiple searchers',
  (querySearch, title, successful, notRequired, wrongType) => {
    test(`${title}: empty case`, async () => {
      const { data, errors } = await query({
        query: querySearch,
        variables: successful,
      });
      // check no errors in the query
      expect(errors).toBeUndefined();
      expect(data).not.toBeUndefined();
      expect(data).not.toBeNull();

      // check that sample is in the response
      const response = data && data[title];
      expect(response).not.toBeUndefined();
      expect(response).toHaveLength(0);
    });

    test(`${title}: correct variables`, async () => {
      // checks that the variables are send
      const res1 = await query({
        query: querySearch,
      });
      expect(res1.data).toBeUndefined();
      expect(res1.errors).not.toBeUndefined();

      // checks that the variable id is not in the query
      const res2 = await query({
        query: querySearch,
        variables: notRequired,
      });
      expect(res2.data).toBeUndefined();
      expect(res2.errors).not.toBeUndefined();

      // checks that the type variable is wrong
      const res3 = await query({
        query: querySearch,
        variables: wrongType,
      });
      expect(res3.data).toBeUndefined();
      expect(res3.errors).not.toBeUndefined();
    });
  },
);