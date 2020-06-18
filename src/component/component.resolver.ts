import { Context } from '../context';
import { Resolvers } from '../generated/graphql';

import { Component } from './component.model';

function notEmpty<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

async function appendComponent(
  component: Component,
  parentId: string,
  childId: string,
  key: 'input' | 'output',
) {
  const child = await component.findById(childId);
  if (!child) {
    throw new Error(`Component ${childId} doesn't exist`);
  }

  const ans = await component.append(parentId, { [key]: childId });
  if (!ans || !ans.value) {
    throw new Error(`Append ${childId} to ${parentId} failed`);
  }
  return ans.value;
}

async function removeComponent(
  component: Component,
  parentId: string,
  childId: string,
  key: 'input' | 'output',
) {
  const child = await component.findById(childId);
  if (!child) {
    throw new Error(`Component ${childId} doesn't exist`);
  }

  const ans = await component.pop(parentId, { [key]: childId });
  if (!ans || !ans.value) {
    throw new Error(`Remove ${childId} to ${parentId} failed`);
  }
  return ans.value;
}

export const componentResolver: Resolvers<Context> = {
  Query: {
    component(_, { _id }, { models: { component } }) {
      return component.findById(_id);
    },
    components(_, { page, filters }, { models: { component } }) {
      return component.findPaginated(page, filters);
    },
  },

  Component: {
    kind({ kind }, _, { models }) {
      return models.kind.findById(kind);
    },
    async input({ input }, _, { models }) {
      if (input) {
        const promComponent = input.map((id) => models.component.findById(id));
        const components = await Promise.all(promComponent);
        return components.filter(notEmpty);
      } else {
        return [];
      }
    },
    async output({ output }, _, { models }) {
      if (output) {
        const promComponent = output.map((id) => models.component.findById(id));
        const components = await Promise.all(promComponent);
        return components.filter(notEmpty);
      } else {
        return null;
      }
    },
  },

  Mutation: {
    async createComponent(_, { component }, { models }) {
      const kind = await models.kind.findById(component.kind);
      if (kind === null) {
        throw new Error(`Kind ${component.kind} doesn't exists`);
      }
      const inserted = await models.component.insertOne(component);
      return inserted.result && inserted.ops[0];
    },
    async updateComponent(_, { _id, component }, { models }) {
      const { value } = await models.component.updateOne(_id, component);
      if (!value) throw new Error(`Updated failed to ${_id}`);
      return value;
    },

    appendComponentInput(_, { parentId, childId }, { models: { component } }) {
      return appendComponent(component, parentId, childId, 'input');
    },
    appendComponentOutput(_, { parentId, childId }, { models: { component } }) {
      return appendComponent(component, parentId, childId, 'output');
    },

    removeComponentInput(_, { parentId, childId }, { models: { component } }) {
      return removeComponent(component, parentId, childId, 'input');
    },
    removeComponentOutput(_, { parentId, childId }, { models: { component } }) {
      return removeComponent(component, parentId, childId, 'output');
    },
  },
};
