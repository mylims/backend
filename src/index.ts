/* eslint-disable no-console */
import { ApolloServer, Config } from 'apollo-server-fastify';
import fastify from 'fastify';

import { DbConnector } from './connectors';
// Provide resolver functions for your schema fields
import { resolvers } from './resolvers';
// Construct a schema, using GraphQL schema language
import { typeDefs } from './schemas';

// Instantiates the database connector class
const dbConnection = new DbConnector();

/**
 * Creates the server and connects to the database
 * @param options - Apollo server related options
 * @param port - server port for GraphQL
 */
async function createApp(options: Config, port: number) {
  const app = fastify({ logger: true });
  const server = new ApolloServer(options);

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  app.register(server.createHandler());
  await app.listen(port);
  return server;
}

// Creates the server
const context = async () => ({ db: await dbConnection.connect() });
createApp({ typeDefs, resolvers, context }, 4000)
  .then((server) => {
    console.log(
      `🚀 Server ready at http://localhost:4000${server.graphqlPath}`,
    );
  })
  .catch((err) => {
    console.error(err);
    return dbConnection.disconnect();
  });
