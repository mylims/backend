import { GraphQLScalarType } from 'graphql';
import { IResolvers } from 'graphql-tools';
import GraphQLJSON from 'graphql-type-json';
import merge from 'lodash.merge';

import { kindResolver } from './kind';

interface Scalar {
  [k: string]: GraphQLScalarType;
}

type Resolvers = Scalar | IResolvers;

export const resolvers: Resolvers = merge({ JSON: GraphQLJSON }, kindResolver);
