import { IResolvers } from 'graphql-tools';
import GraphQLJSON from 'graphql-type-json';
import merge from 'lodash.merge';

import { experimentResolver } from './experiment/experiment.resolver';
import { kindResolver } from './kind/kind.resolver';

export const resolvers: IResolvers = merge(
  { JSON: GraphQLJSON },
  kindResolver,
  experimentResolver,
);
