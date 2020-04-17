import GraphQLJSON from 'graphql-type-json';
import merge from 'lodash.merge';

import { kindResolver } from './kind';

export const resolvers = merge({ JSON: GraphQLJSON }, kindResolver);
