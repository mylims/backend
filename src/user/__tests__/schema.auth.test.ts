import { gql } from 'apollo-server-fastify';
import {
  createTestClient,
  ApolloServerTestClient,
} from 'apollo-server-testing';
import { MongoClient } from 'mongodb';

import { Models } from '../../context';
import { createServer } from '../../index';
import { UserInput } from '../../generated/graphql';

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
  const { user } = models;
  await user.drop();
  return db.close();
});

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

const SIGN_IN = gql`
  query signin($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      token
      user {
        email
      }
    }
  }
`;

describe('User auth', () => {
  it('sign in', async () => {
    // Insert user
    const user: UserInput = {
      name: 'test',
      email: 'test@test.io',
      password: 'test',
    };
    const create = await mutate({
      mutation: CREATE,
      variables: { user },
    });
    expect(create.errors).toBeUndefined();
    expect(create.data).not.toBeUndefined();
    expect(create.data).not.toBeNull();
    const data1 = create.data || {};
    expect(data1.createUser).not.toBeUndefined();
    expect(data1.createUser).toHaveProperty('token');
    expect(data1.createUser.user).toHaveProperty('_id');
    expect(data1.createUser.user.name).toBe('test');

    // Sign in
    const signin = await query({
      query: SIGN_IN,
      variables: user,
    });
    // check no errors in the query
    expect(signin.errors).toBeUndefined();
    expect(signin.data).not.toBeUndefined();
    expect(signin.data).not.toBeNull();
    expect(signin.data?.signin).toHaveProperty('token');
    expect(signin.data?.signin.user.email).toBe(user.email);
  });
});
