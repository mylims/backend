import {
  SchemaDirectiveVisitor,
  AuthenticationError,
} from 'apollo-server-fastify';
import { defaultFieldResolver, GraphQLField } from 'graphql';

import { Context } from './context';
import { User, Role } from './generated/graphql';

type Ctx = Context & { user: User | null };

export class AuthDirective extends SchemaDirectiveVisitor {
  private levels: Record<Role, number> = {
    ADMIN: 3,
    GROUP_ADMIN: 2,
    MEMBER: 1,
  };

  public visitFieldDefinition(field: GraphQLField<unknown, Ctx>) {
    const { resolve = defaultFieldResolver } = field;
    field.resolve = (...args) => {
      const { role } = this.args;
      if (role) {
        const { user } = args[2];
        if (!user) throw new AuthenticationError('Not authenticated');
        const roleLevel = this.levels[user.role];
        if (!roleLevel) {
          throw new AuthenticationError(`Unknown level ${user.role}`);
        }
        if (roleLevel < this.levels[role as Role]) {
          throw new AuthenticationError(
            `Required role ${role}, received ${user.role}`,
          );
        }
      }
      return resolve.apply(this, args);
    };
  }
}
