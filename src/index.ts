/* eslint-disable no-console */
import { ApolloServer, Config } from 'apollo-server-fastify';
import fastify from 'fastify';

// Provide resolver functions for your schema fields
import { resolvers } from './resolvers';
// Construct a schema, using GraphQL schema language
import { typeDefs } from './schemas';

async function createApp(options: Config, port: number) {
  const app = fastify({ logger: true });
  const server = new ApolloServer(options);

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  app.register(server.createHandler());
  await app.listen(port);
  return server;
}

createApp({ typeDefs, resolvers }, 4000)
  .then((server) => {
    console.log(
      `🚀 Server ready at http://localhost:4000${server.graphqlPath}`,
    );
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
