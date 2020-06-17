import { Context } from '../context';
import { Resolvers } from '../generated/graphql';

export const kindResolver: Resolvers<Context> = {
  Query: {
    kind(_, { _id }, { models: { kind } }) {
      return kind.findById(_id);
    },
    kinds(_, { page, filters }, { models: { kind } }) {
      return kind.findPaginated(page, filters);
    },
  },

  Mutation: {
    async createKind(_, { kind }, { models }) {
      const inserted = await models.kind.insertOne(kind);
      return inserted.result && inserted.ops[0];
    },
    async updateKind(_, { _id, kind }, { models }) {
      const { value } = await models.kind.updateOne(_id, kind);
      if (!value) throw new Error(`Updated failed to ${_id}`);
      return value;
    },
  },
};
