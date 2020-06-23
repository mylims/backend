/* eslint-disable no-console */
import { ApolloServer } from 'apollo-server-fastify';
import fastify from 'fastify';

import { DbConnector } from './connector';
import { context as contextFn } from './context';
import { resolvers } from './resolvers';
import { typeDefs } from './schemas';

export async function createServer() {
  const db = await new DbConnector().connect();
  const context = await contextFn({ db });
  return {
    server: new ApolloServer({ typeDefs, resolvers, context }),
    context,
  };
}

/**
 * Creates the server and connects to the database
 * @param port - server port for GraphQL
 */
async function createApp(port: number) {
  const app = fastify({ logger: true });
  const { server } = await createServer();

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
