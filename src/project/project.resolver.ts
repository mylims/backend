import { ObjectId } from 'mongodb';

import { Context } from '../context';
import { Resolvers, ProjectDbObject } from '../generated/graphql';
import { bulkFindById } from '../utils/resolvers';

export const projectResolver: Resolvers<Context> = {
  Query: {
    project(_, { _id }, { models: { project } }) {
      return project.findById(_id);
    },
    projects(_, { page, filters }, { models: { project } }) {
      return project.findPaginated(page, filters);
    },
    projectsByOwner(_, { ownerId }, { models: { project } }) {
      const owners = new ObjectId(ownerId);
      return project.findMany({ owners });
    },
  },

  Project: {
    owners({ owners }, _, { models: { user } }) {
      return bulkFindById(owners, user);
    },
    samples({ samples }, _, { models: { sample } }) {
      return bulkFindById(samples, sample);
    },
    experiments({ experiments }, _, { models: { experiment } }) {
      return bulkFindById(experiments, experiment);
    },
  },

  Mutation: {
    async createProject(_, { project }, { models }) {
      const { kind, date, user } = project.status || {};
      const created: Omit<ProjectDbObject, '_id'> = {
        ...project,
        title: project.title || '',
        status: project.status && [
          {
            kind: kind || '',
            date: date || new Date().toString(),
            user: typeof user === 'string' ? new ObjectId(user) : user,
          },
        ],
      };
      const inserted = await models.project.insertOne(created);
      return inserted.result && inserted.ops[0];
    },
    async updateProject(_, { _id, project }, { models }) {
      const { status, ...updated } = project;
      const { value } = await models.project.updateOne(_id, updated);
      if (!value) throw new Error(`Updated failed to ${_id}`);

      if (status) {
        const { value: add } = await models.project.append(_id, { status });
        if (!add) throw new Error(`Updated failed to ${_id}`);
        return add;
      } else {
        return value;
      }
    },
  },
};
