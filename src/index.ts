/* eslint-disable no-console */
/* istanbul ignore file */
import { ApolloServer } from 'apollo-server-fastify';
import fastify from 'fastify';

import { DbConnector } from './connector';
import { context as contextFn } from './context';
import { AuthDirective } from './directives';
import { resolvers } from './resolvers';
import { typeDefs } from './schemas';
import { getUserFromToken } from './utils/auth';

export async function createServer(test?: boolean) {
  const db = await new DbConnector().connect();
  const context = await contextFn({ db });
  return {
    server: new ApolloServer({
      typeDefs,
      resolvers,
      schemaDirectives: { auth: AuthDirective },
      context({ req }) {
        const token: string = req?.headers?.authorization;
        const user = test ? { role: 'ADMIN' } : getUserFromToken(token);
        return { ...context, user };
      },
    }),
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
