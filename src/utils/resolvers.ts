import { ObjectID } from 'mongodb';

interface WithFindById<Model> {
  findById: (
    id: string | Model | ObjectID | null | undefined,
  ) => Promise<Model | null>;
}

export function notEmpty<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

export async function bulkFindById<T extends WithFindById<Model>, Model>(
  list: Model[] | null | undefined,
  model: T,
) {
  if (list) {
    const promList = list.map((id) => model.findById(id));
    const responses = await Promise.all(promList);
    return responses.filter(notEmpty);
  } else {
    return null;
  }
}
