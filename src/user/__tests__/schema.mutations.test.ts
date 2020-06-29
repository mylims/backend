import { gql } from 'apollo-server-fastify';
import {
  createTestClient,
  ApolloServerTestClient,
} from 'apollo-server-testing';
import { MongoClient } from 'mongodb';

import { Models } from '../../context';
import { User as UserType } from '../../generated/graphql';
import { createServer } from '../../index';
import { randomId } from '../../utils/fake';

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
      _id
      name
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
    const res1 = await query({
      query: GET_ID,
      variables: { id: randomId(24) },
    });

    // check no errors in the query
    expect(res1.errors).toBeUndefined();
    expect(res1.data).not.toBeUndefined();
    expect(res1.data).not.toBeNull();
    const data1 = res1.data || {};
    expect(data1.user).not.toBeUndefined();
    expect(data1.user).toBeNull();

    // Insert user
    const user: Partial<UserType> = {
      name: 'test',
      email: 'test@test.io',
    };
    const create = await mutate({
      mutation: CREATE,
      variables: { user },
    });
    expect(create.errors).toBeUndefined();
    expect(create.data).not.toBeUndefined();
    expect(create.data).not.toBeNull();
    const data2 = create.data || {};
    expect(data2.createUser).not.toBeUndefined();
    expect(data2.createUser).toHaveProperty('_id');
    expect(data2.createUser.name).toBe('test');

    // Update user
    const id = data2.createUser._id;
    const name = 'test update';
    const update = await mutate({
      mutation: UPDATE,
      variables: { id, user: { name } },
    });
    expect(update.errors).toBeUndefined();
    expect(update.data).not.toBeUndefined();
    expect(update.data).not.toBeNull();
    const data3 = update.data || {};
    expect(data3.updateUser).not.toBeUndefined();
    expect(data3.updateUser._id).toBe(id);
    expect(data3.updateUser.name).toBe(name);
  });
});
