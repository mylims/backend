import axios from 'axios';

import { Context } from '../context';
import { Resolvers } from '../generated/graphql';

const fileServer = 'http://filesystem';

export const fileResolver: Resolvers<Context> = {
  Query: {
    async file(_, { _id }, { models: { file } }) {
      const result = await file.findById(_id);
      if (result) {
        const url = await axios.get<string>(
          `${fileServer}/sign_download/${result.hashname}`,
        );
        if (!url.data) {
          throw new Error(`Can't fetch signed url for ${result.hashname}`);
        }
        return { ...result, signedUrl: url.data };
      }
      return null;
    },
    async files(_, { page, filters }, { models: { file } }) {
      const { result: files } = await file.findPaginated(page, filters);
      if (files) {
        const ans = files.map(async (result) => {
          const url = await axios.get<string>(
            `${fileServer}/sign_download/${result.hashname}`,
          );
          if (!url.data) {
            throw new Error(`Can't fetch signed url for ${result.hashname}`);
          }
          return { ...result, signedUrl: url.data };
        });
        return Promise.all(ans);
      }
      return null;
    },
  },

  Mutation: {
    async createFile(_, { file }, { models }) {
      const inserted = await models.file.insertOne({
        ...file,
        creationDate: new Date().toString(),
      });
      if (inserted.result) {
        const created = inserted.ops[0];
        const url = await axios.get<string>(
          `${fileServer}/sign_upload/${created.hashname}`,
        );
        if (!url.data) {
          throw new Error(`Can't fetch signed url for ${created.hashname}`);
        }
        return {
          ...created,
          signedUrl: url.data,
        };
      } else {
        throw new Error('Insertion error');
      }
    },
  },
};
