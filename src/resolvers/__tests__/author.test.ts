import { authorResolver } from '../author';

describe('test author resolvers', () => {
  it('search author by id', () => {
    const query = (id: number) => authorResolver.Query.author(null, { id });
    expect(query(1)).toStrictEqual({
      id: 1,
      firstName: 'Tom',
      lastName: 'Coleman',
    });
    expect(query(100000)).toBeUndefined();
  });
});
