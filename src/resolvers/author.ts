import { posts, authors, Author as AuthorType } from '../connectors/example';

export const authorResolver = {
  Query: {
    author: (_: unknown, { id }: { id: number }) =>
      authors.find((author) => author.id === id),
  },

  Author: {
    posts: (author: AuthorType) =>
      posts.filter(({ authorId }) => authorId === author.id),
  },
};
