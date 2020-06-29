import { Context } from '../context';
import { Resolvers } from '../generated/graphql';

export const userResolver: Resolvers<Context> = {
  Query: {
    user(_, { _id }, { models: { user } }) {
      return user.findById(_id);
    },
    users(_, { page, filters }, { models: { user } }) {
      return user.findPaginated(page, filters);
    },
  },

  Mutation: {
    async createUser(_, { user }, { models }) {
      const inserted = await models.user.insertOne(user);
      return inserted.result && inserted.ops[0];
    },
    async updateUser(_, { _id, user }, { models }) {
      const { value } = await models.user.updateOne(_id, user);
      if (!value) throw new Error(`Updated failed to ${_id}`);
      return value;
    },
  },
};
