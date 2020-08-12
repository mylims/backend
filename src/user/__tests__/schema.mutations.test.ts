import { gql } from 'apollo-server-fastify';
import {
  createTestClient,
  ApolloServerTestClient,
} from 'apollo-server-testing';
import { MongoClient } from 'mongodb';

import { Models } from '../../context';
import { UserInput } from '../../generated/graphql';
import { createServer } from '../../index';
import { randomId } from '../../utils/fake';

// Mocked server
let query: ApolloServerTestClient['query'];
let mutate: ApolloServerTestClient['mutate'];
let models: Models;
let db: MongoClient;

beforeAll(async () => {
  const { server, context } = await createServer(true);
  const test = createTestClient(server);
  query = test.query;
  mutate = test.mutate;
  models = context.models;
  db = context.db;
});

afterAll(async () => {
  const { user } = models;
  await user.drop();
  return db.close();
});

const GET_ID = gql`
  query user($id: String!) {
    user(_id: $id) {
      _id
      name
    }
  }
`;

const CREATE = gql`
  mutation createUser($user: UserInput!) {
    createUser(user: $user) {
      token
      user {
        _id
        name
      }
    }
  }
`;

const UPDATE = gql`
  mutation updateUser($id: String!, $user: UserInput!) {
    updateUser(_id: $id, user: $user) {
      _id
      name
    }
  }
`;

describe('User single searchers', () => {
  it('Insertion', async () => {
    const ans = await query({ query: GET_ID, variables: { id: randomId(24) } });

    // check no errors in the query
    expect(ans.errors).toBeUndefined();
    expect(ans.data).not.toBeUndefined();
    expect(ans.data).not.toBeNull();
    expect(ans.data?.user).not.toBeUndefined();
    expect(ans.data?.user).toBeNull();

    // Insert user
    const user: UserInput = {
      name: 'test',
      email: 'test@test.io',
      password: 'test',
    };
    const create = await mutate({ mutation: CREATE, variables: { user } });
    expect(create.errors).toBeUndefined();
    expect(create.data).not.toBeUndefined();
    expect(create.data).not.toBeNull();
    expect(create.data?.createUser).not.toBeUndefined();
    expect(create.data?.createUser).toHaveProperty('token');
    expect(create.data?.createUser.user).toHaveProperty('_id');
    expect(create.data?.createUser.user.name).toBe('test');

    // Update user
    const id = create.data?.createUser.user._id;
    const name = 'test update';
    const variables = { id, user: { name } };
    const update = await mutate({ mutation: UPDATE, variables });
    expect(update.errors).toBeUndefined();
    expect(update.data).not.toBeUndefined();
    expect(update.data).not.toBeNull();
    expect(update.data?.updateUser).not.toBeUndefined();
    expect(update.data?.updateUser._id).toBe(id);
    expect(update.data?.updateUser.name).toBe(name);
  });
});
