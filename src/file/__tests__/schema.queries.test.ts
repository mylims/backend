import { gql } from 'apollo-server-fastify';
import {
  createTestClient,
  ApolloServerTestClient,
} from 'apollo-server-testing';
import axios from 'axios';
import { MongoClient } from 'mongodb';
import { mocked } from 'ts-jest/utils';

import { Models } from '../../context';
import { createServer } from '../../index';
import { randomId } from '../../utils/fake';

// Mocked server
let query: ApolloServerTestClient['query'];
let models: Models;
let db: MongoClient;

jest.mock('axios');
const mockedAxios = mocked(axios, true);
mockedAxios.get.mockImplementation(() => Promise.resolve({ data: 'test' }));

beforeAll(async () => {
  const { server, context } = await createServer();
  const test = createTestClient(server);
  query = test.query;
  models = context.models;
  db = context.db;
});

afterAll(async () => {
  const { file } = models;
  await file.drop();
  return db.close();
});

// search file by id
const GET_ID = gql`
  query file($id: String!) {
    file(_id: $id) {
      _id
      filename
      signedUrl
    }
  }
`;

describe('File', () => {
  describe('File by id', () => {
    it('empty case', async () => {
      const { data, errors } = await query({
        query: GET_ID,
        variables: { id: randomId(12) },
      });
      // check no errors in the query
      expect(errors).toBeUndefined();
      expect(data).not.toBeUndefined();
      expect(data).not.toBeNull();

      // check that file is in the response
      const { file } = data || {};
      expect(file).not.toBeUndefined();
      expect(file).toBeNull();
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
