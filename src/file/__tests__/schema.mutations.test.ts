import { gql } from 'apollo-server-fastify';
import {
  createTestClient,
  ApolloServerTestClient,
} from 'apollo-server-testing';
import axios from 'axios';
import { MongoClient } from 'mongodb';
import { mocked } from 'ts-jest/utils';

import { Models } from '../../context';
import { File as FileType } from '../../generated/graphql';
import { createServer } from '../../index';
import { randomId } from '../../utils/fake';

jest.mock('axios');
const mockedAxios = mocked(axios, true);
mockedAxios.get.mockImplementation(() => Promise.resolve({ data: 'test' }));

// Mocked server
let query: ApolloServerTestClient['query'];
let mutate: ApolloServerTestClient['mutate'];
let models: Models;
let db: MongoClient;

beforeAll(async () => {
  const { server, context } = await createServer();
  const test = createTestClient(server);
  query = test.query;
  mutate = test.mutate;
  models = context.models;
  db = context.db;
});

afterAll(async () => {
  const { file } = models;
  await file.drop();
  return db.close();
});

const GET_ID = gql`
  query file($id: String!) {
    file(_id: $id) {
      _id
      filename
      signedUrl
    }
  }
`;

const CREATE = gql`
  mutation createFile($file: FileInput!) {
    createFile(file: $file) {
      _id
      filename
      signedUrl
    }
  }
`;

describe('File single searchers', () => {
  it('Insertion', async () => {
    const byId = await query({
      query: GET_ID,
      variables: { id: randomId(24) },
    });

    // check no errors in the query
    expect(byId.errors).toBeUndefined();
    expect(byId.data).not.toBeUndefined();
    expect(byId.data).not.toBeNull();
    expect(byId.data?.file).not.toBeUndefined();
    expect(byId.data?.file).toBeNull();

    // Insert file
    const file: Partial<FileType> = {
      filename: 'test_file',
      mimetype: 'text/plain',
      encoding: 'UTF-8',
      hashname: randomId(16),
    };
    const create = await mutate({
      mutation: CREATE,
      variables: { file },
    });
    expect(create.errors).toBeUndefined();
    expect(create.data).not.toBeUndefined();
    expect(create.data).not.toBeNull();
    expect(create.data?.createFile).not.toBeUndefined();
    expect(create.data?.createFile).not.toBeNull();
    expect(create.data?.createFile).toHaveProperty('_id');
    expect(create.data?.createFile.signedUrl).toBe('test');
  });
});
