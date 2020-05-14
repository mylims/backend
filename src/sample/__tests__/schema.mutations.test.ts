import { ApolloServer, gql } from 'apollo-server-fastify';
import { createTestClient } from 'apollo-server-testing';

import { DbConnector } from '../../connector';
import { resolvers } from '../../resolvers';
import { typeDefs } from '../../schemas';
import { randomId } from '../../utils/fake';
import { Sample, SampleType } from '../sample.model';

// Mocked server
const dbConnection = new DbConnector();
const context = async () => ({ db: await dbConnection.connect() });
const server = new ApolloServer({ typeDefs, resolvers, context });
const { query, mutate } = createTestClient(server);

afterAll(async () => {
  const db = await dbConnection.connect();
  const exp = new Sample(db);
  await exp.empty();
  await dbConnection.disconnect();
});

const GET_ID = gql`
  query sample($id: String!) {
    sample(_id: $id) {
      _id
      title
    }
  }
`;

const CREATE = gql`
  mutation createSample($sample: SampleInput!) {
    createSample(sample: $sample) {
      _id
      title
    }
  }
`;

const UPDATE = gql`
  mutation updateSample($id: String!, $description: String!) {
    updateSample(_id: $id, description: $description) {
      _id
      description
    }
  }
`;

describe('Sample single searchers', () => {
  it('Insertion', async () => {
    const res1 = await query({
      query: GET_ID,
      variables: { id: randomId(12) },
    });

    // check no errors in the query
    expect(res1.errors).toBeUndefined();
    expect(res1.data).not.toBeUndefined();
    expect(res1.data).not.toBeNull();
    const data1 = res1.data || {};
    expect(data1.sample).not.toBeUndefined();
    expect(data1.sample).toBeNull();

    // Insert sample
    const sample: Partial<SampleType> = {
      title: 'test',
      status: [{ kind: 'test', date: new Date().toString() }],
    };
    const create = await mutate({
      mutation: CREATE,
      variables: { sample },
    });
    expect(create.errors).toBeUndefined();
    expect(create.data).not.toBeUndefined();
    expect(create.data).not.toBeNull();
    const data2 = create.data || {};
    expect(data2.createSample).not.toBeUndefined();
    expect(data2.createSample).toHaveProperty('_id');
    expect(data2.createSample.title).toBe('test');

    // Update sample
    const id = data2.createSample._id;
    const description = 'test update';
    const update = await mutate({
      mutation: UPDATE,
      variables: { id, description },
    });
    expect(update.errors).toBeUndefined();
    expect(update.data).not.toBeUndefined();
    expect(update.data).not.toBeNull();
    const data3 = update.data || {};
    expect(data3.updateSample).not.toBeUndefined();
    expect(data3.updateSample._id).toBe(id);
    expect(data3.updateSample.description).toBe(description);
  });
});
