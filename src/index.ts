import { ApolloServer } from 'apollo-server-koa';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import json from 'koa-json';
import logger from 'koa-logger';

// Provide resolver functions for your schema fields
import { resolvers } from './resolvers';
// Construct a schema, using GraphQL schema language
import { typeDefs } from './schemas';

const server = new ApolloServer({ typeDefs, resolvers });

const app = new Koa();

/** Middleware */
app.use(json());
app.use(logger());
app.use(bodyParser());

server.applyMiddleware({ app });
// alternatively you can get a composed middleware from the apollo server
// app.use(server.getMiddleware());

app.listen({ port: 4000 }, () =>
  // eslint-disable-next-line no-console
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`),
);
