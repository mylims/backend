/* eslint-disable no-console */
import { ApolloServer, Config } from 'apollo-server-fastify';
import fastify from 'fastify';

import { context } from './context';
import { resolvers } from './resolvers';
import { typeDefs } from './schemas';

export function createServer(config: Config) {
  return new ApolloServer({ typeDefs, resolvers, ...config });
}

/**
 * Creates the server and connects to the database
 * @param port - server port for GraphQL
 */
async function createApp(port: number) {
  const app = fastify({ logger: true });
  const server = createServer({ context });

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  app.register(server.createHandler());
  await app.listen(port);
  return server;
}

// Creates the server
if (require.main === module) {
  createApp(4000)
    .then((server) => {
      console.log(
        `🚀 Server ready at http://localhost:4000${server.graphqlPath}`,
      );
    })
    .catch((err) => {
      console.error(`💥 Error: ${err}`);
    });
}
