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
      name: 'isOwner',
      description: 'User is part of the owners',
      type: GraphQLBoolean,
      defaultValue: false,
      extensions: undefined,
      astNode: undefined,
    });

    field.resolve = (...args) => {
      const { admin } = this.args;
      if (admin) {
        // Checks user on the context
        const { group, isOwner } = args[1];
        const { user } = args[2];
        if (!user) throw new AuthError('Not authenticated');

        // Belongs to group
        const belongGroup = user.groups?.reduce(
          (acc, name) => acc || name === group,
          false,
        );
        if (!belongGroup) throw new AuthError(`Don't belong to group`);

        // Permissions
        const isAdmin = ['ADMIN', 'GROUP_ADMIN'].includes(user.role);
        if (!isAdmin && !isOwner) throw new AuthError(`Not an owner`);
      }
      return resolve.apply(this, args);
    };
  }
}

export class AdminDirective extends SchemaDirectiveVisitor {
  public visitFieldDefinition(field: GraphQLField<unknown, Ctx>) {
    const { resolve = defaultFieldResolver } = field;

    field.resolve = (...args) => {
      const { user } = args[2];
      if (user?.role !== 'ADMIN') {
        throw new AuthError(`Required admin role, received ${user?.role}`);
      }
      return resolve.apply(this, args);
    };
  }
}
