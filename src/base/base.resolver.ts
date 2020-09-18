import { Context } from '../context';
import { Resolvers } from '../generated/graphql';

export const baseResolver: Resolvers<Context> = {
  Pagination: { __resolveType: () => null },

  Status: {
    user({ user }, _, { models }) {
      return models.user.findById(user);
    },
  },
};
