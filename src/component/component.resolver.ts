import { IResolvers } from 'graphql-tools';
import { MongoClient } from 'mongodb';

import { Kind } from '../kind/kind.model';

import { Component, ComponentType } from './component.model';

/**
 * Simplifies the resolver manipulation
 * @param params - Resolver parameters
 */
function componentHelper(
  params: [unknown, { [k: string]: unknown }, { db: MongoClient }, unknown],
): { [k: string]: unknown; db: Component } {
  return { ...params[1], db: new Component(params[2].db) };
}

/**
 * Simplifies sample appending
 * @param params - Resolver parameters
 * @param key - Field to be appended
 */
async function appendComponent(
  params: [
    unknown,
    { parentId: string; childId: string },
    { db: MongoClient },
    unknown,
  ],
  key: 'input' | 'output',
) {
  const { parentId, childId } = params[1];
  const { db } = params[2];

  const child = await new Component(db).findById(childId);
  if (child == null) {
    throw Error(`Component ${childId} doesn't exist`);
  }

  const ans = await new Component(db).appendTo(parentId, { [key]: childId });
  return ans && ans.value;
}

async function removeComponent(
  params: [
    unknown,
    { parentId: string; childId: string },
    { db: MongoClient },
    unknown,
  ],
  key: 'input' | 'output',
) {
  const { parentId, childId } = params[1];
  const { db } = params[2];

  const parent = await new Component(db).findById(parentId);
  if (parent === null) {
    throw Error(`Component ${parentId} doesn't exist`);
  }

  const ans = await new Component(db).removeTo(parentId, { [key]: childId });
  return ans && ans.value;
}

/**
 * Simplifies interaction with kind
 * @param params - Resolver parameters
 */
function fetchKind(
  params: [
    { kind: string },
    Partial<ComponentType>,
    { db: MongoClient },
    unknown,
  ],
) {
  const kinds = new Kind(params[2].db);
  const { kind } = params[0];
  return kinds.findById(kind);
}

/**
 * Simplifies interaction with linked components
 * @param params - Resolver parameters
 * @param key - Searched field
 */
function fetchComponent(
  params: [
    { input?: string[]; output?: string[] },
    Partial<ComponentType>,
    { db: MongoClient },
    unknown,
  ],
  key: 'input' | 'output',
) {
  const components = new Component(params[2].db);
  const list = params[0][key];
  if (list) {
    const promComponent = list.map((id: string) => components.findById(id));
    return Promise.all(promComponent);
  } else {
    return null;
  }
}

export const componentResolver: IResolvers = {
  Query: {
    // Search component by id
    component: (...params) => {
      const { db, _id } = componentHelper(params);
      return db.findById(_id as string);
    },
  },

  Component: {
    kind: (...params) => fetchKind(params),
    input: (...params) => fetchComponent(params, 'input'),
    output: (...params) => fetchComponent(params, 'output'),
  },

  Mutation: {
    createComponent: async (_, { component }, { db }) => {
      const kind = await new Kind(db).findById(component.kind);
      if (kind === null) {
        throw Error(`Kind ${component.kind} doesn't exists`);
      }
      const inserted = await new Component(db).insertOne(component);
      return inserted.result && inserted.ops[0];
    },
    updateComponent: async (...params) => {
      const { db, _id, kind, content } = componentHelper(params) as {
        db: Component;
        _id: string;
        kind: string;
        content: Record<string, unknown>;
      };
      const updater: Partial<ComponentType> = { kind, content };
      const { value } = await db.updateOne(_id, updater);
      return value;
    },

    appendComponentInput: (...params) => appendComponent(params, 'input'),
    appendComponentOutput: (...params) => appendComponent(params, 'output'),
    removeComponentInput: (...params) => removeComponent(params, 'input'),
    removeComponentOutput: (...params) => removeComponent(params, 'output'),
  },
};
