import {
  SchemaDirectiveVisitor,
  AuthenticationError,
} from 'apollo-server-fastify';
import { defaultFieldResolver, GraphQLField } from 'graphql';

import { Context } from './context';
import { User } from './generated/graphql';

type Ctx = Context & { user: User | null };

export class AuthDirective extends SchemaDirectiveVisitor {
  public visitFieldDefinition(field: GraphQLField<unknown, Ctx>) {
    const { resolve = defaultFieldResolver } = field;
    field.resolve = (...args) => {
      const { role } = this.args;
      if (role) {
        const { user } = args[2];
        if (!user) throw new AuthenticationError('Not authenticated');
        if (!user.role === role) {
          throw new AuthenticationError(
            `Required role ${role}, received ${user.role}`,
          );
        }
      }
      return resolve.apply(this, args);
    };
  }
}
