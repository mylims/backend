import { Context } from '../context';
import { Resolvers, UserInput } from '../generated/graphql';
import { createToken, hashing } from '../utils/auth';
import { randomId } from '../utils/fake';

import { User } from './user.model';

async function updateUser(
  userModel: User,
  _id: string,
  user: Omit<UserInput, 'password'> & { salt?: string; hash?: string },
) {
  const { value } = await userModel.updateOne(_id, user);
  if (!value) throw new Error(`Updated failed to ${_id}`);
  return value;
}

export const userResolver: Resolvers<Context> = {
  Query: {
    user(_, { _id }, { models: { user } }) {
      return user.findById(_id);
    },
    users(_, { page, filters }, { models: { user } }) {
      return user.findPaginated(page, filters);
    },
    signin(_, { email, password }, { models }) {
      return models.user.signin(email, password);
    },
  },

  Mutation: {
    async createUser(_, { user: { password, ...user } }, { models }) {
      if (!password) throw new Error('password required');
      const salt = randomId(16);
      const hash = hashing(password, salt);
      const inserted = await models.user.insertOne({ ...user, salt, hash });
      if (inserted.result) {
        const newUser = inserted.ops[0];
        const token = createToken(newUser);
        return { user: newUser, token };
      } else {
        throw new Error(`Error inserting ${user}`);
      }
    },
    async updateUser(_, { _id, user: { password, ...user } }, { models }) {
      if (password) {
        const salt = randomId(16);
        const hash = hashing(password, salt);
        return updateUser(models.user, _id, { salt, hash, ...user });
      }
      return updateUser(models.user, _id, user);
    },
    async appendUserGroup(_, { _id, group }, { models }) {
      const { value } = await models.user.append(_id, { group });
      if (!value) throw new Error(`Appending group to ${_id} failed`);
      return value;
    },
  },
};
