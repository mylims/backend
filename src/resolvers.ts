import GraphQLJSON from 'graphql-type-json';
import merge from 'lodash.merge';

import { baseResolver } from './base/base.resolver';
import { Context } from './context';
import { experimentResolver } from './experiment/experiment.resolver';
import { fileResolver } from './file/file.resolver';
import { Resolvers } from './generated/graphql';
import { measurementResolver } from './measurement/measurement.resolver';
import { projectResolver } from './project/project.resolver';
import { sampleResolver } from './sample/sample.resolver';
import { userResolver } from './user/user.resolver';

export const resolvers: Resolvers<Context> = merge(
  { JSON: GraphQLJSON },
  baseResolver,
  experimentResolver,
  fileResolver,
  measurementResolver,
  projectResolver,
  sampleResolver,
  userResolver,
);
