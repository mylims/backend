import GraphQLJSON from 'graphql-type-json';
import merge from 'lodash.merge';

import { componentResolver } from './component/component.resolver';
import { Context } from './context';
import { experimentResolver } from './experiment/experiment.resolver';
import { Resolvers } from './generated/graphql';
import { kindResolver } from './kind/kind.resolver';
import { measurementResolver } from './measurement/measurement.resolver';
import { sampleResolver } from './sample/sample.resolver';

export const resolvers: Resolvers<Context> = merge(
  { JSON: GraphQLJSON },
  componentResolver,
  experimentResolver,
  kindResolver,
  measurementResolver,
  sampleResolver,
);
