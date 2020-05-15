import { IResolvers } from 'graphql-tools';
import GraphQLJSON from 'graphql-type-json';
import merge from 'lodash.merge';

import { componentResolver } from './component/component.resolver';
import { experimentResolver } from './experiment/experiment.resolver';
import { kindResolver } from './kind/kind.resolver';
import { sampleResolver } from './sample/sample.resolver';

export const resolvers: IResolvers = merge(
  { JSON: GraphQLJSON },
  componentResolver,
  experimentResolver,
  kindResolver,
  sampleResolver,
);
