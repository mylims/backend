import {
  SchemaDirectiveVisitor,
  AuthenticationError as AuthError,
} from 'apollo-server-fastify';
import {
  defaultFieldResolver,
  GraphQLField,
  GraphQLString,
  GraphQLBoolean,
} from 'graphql';

import { Context } from './context';
import { User } from './generated/graphql';

type Ctx = Context & { user: User | null };

export class AuthDirective extends SchemaDirectiveVisitor {
  private rolesRequired(required: string, received: string) {
    throw new AuthError(`Required ${required} role, received ${received}`);
  }

  public visitFieldDefinition(field: GraphQLField<unknown, Ctx>) {
    const { resolve = defaultFieldResolver } = field;

    // Adds string elements for group and owner
    field.args.push({
      name: 'group',
      description: 'Element group name',
      type: GraphQLString,
      defaultValue: '',
      extensions: undefined,
      astNode: undefined,
    });
    field.args.push({
      name: 'owner',
      description: 'User is part of the owners',
      type: GraphQLBoolean,
      defaultValue: false,
      extensions: undefined,
      astNode: undefined,
    });

    field.resolve = (...args) => {
      const { role } = this.args;
      if (role) {
        // Checks user on the context
        const { group, owner } = args[1];
        const { user } = args[2];
        if (!user) throw new AuthError('Not authenticated');

        // Admin required
        if (user.role !== 'ADMIN' && role === 'ADMIN') {
          this.rolesRequired(role, user.role);
        }

        // Belongs to group
        const belongGroup = user.groups?.reduce(
          (acc, { name }) => acc || name === group,
          false,
        );
        if (user.role !== 'ADMIN' && !belongGroup) {
          throw new AuthError(`Doesn't belong to group`);
        }

        // Group admin
        if (user.role !== 'GROUP_ADMIN' && role === 'GROUP_ADMIN') {
          this.rolesRequired(role, user.role);
        }

        // If it's the owner
        if (!owner) throw new AuthError(`You are not the owner`);
      }
      return resolve.apply(this, args);
    };
  }
}
