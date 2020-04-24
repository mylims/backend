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
  query experiment($id: String!) {
    experiment(_id: $id) {
      _id
      title
    }
  }
`;

const GET_UUID = gql`
  query experimentByUuid($uuid: String!) {
    experimentByUuid(uuid: $uuid) {
      uuid
      description
    }
  }
`;

const GET_CODE = gql`
  query experimentByCodeId($codeId: String!) {
    experimentByCodeId(codeId: $codeId) {
      codeId
      description
    }
  }
`;

const singleCases: Cases = [
  [GET_ID, 'experiment', { id: 'test' }, { name: 'fail' }, { id: 1 }],
  [
    GET_UUID,
    'experimentByUuid',
    { uuid: 'test' },
    { name: 'fail' },
    { uuid: 1 },
  ],
  [
    GET_CODE,
    'experimentByCodeId',
    { codeId: 'test' },
    { name: 'fail' },
    { codeId: 1 },
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

      // check that experiment is in the response
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

const GET_OWNER = gql`
  query experimentByOwner($owner: String!) {
    experimentByOwner(owner: $owner) {
      owners
      description
    }
  }
`;

const GET_TAG = gql`
  query experimentByTag($tag: String!) {
    experimentByTag(tag: $tag) {
      tags
      description
    }
  }
`;

const GET_TITLE = gql`
  query experimentByTitle($title: String!) {
    experimentByTitle(title: $title) {
      title
      description
    }
  }
`;
const multipleCases: Cases = [
  [
    GET_OWNER,
    'experimentByOwner',
    { owner: 'test' },
    { name: 'fail' },
    { owner: 1 },
  ],
  [GET_TAG, 'experimentByTag', { tag: 'test' }, { name: 'fail' }, { tag: 1 }],
  [
    GET_TITLE,
    'experimentByTitle',
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

      // check that experiment is in the response
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
