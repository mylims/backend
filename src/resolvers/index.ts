import {
  posts,
  authors,
  Author as AuthorType,
  Post as PostType,
} from '../connectors/test';

export const resolvers = {
  Query: {
    posts: () => posts,
    author: (_: unknown, { id }: { id: number }) =>
      authors.find((author) => author.id === id),
  },

  Mutation: {
    upvotePost: (_: unknown, { postId }: { postId: number }) => {
      const post = posts.find(({ id }) => postId === id);
      if (!post) {
        throw new Error(`Couldn't find post with id ${postId}`);
      }
      post.votes += 1;
      return post;
    },
  },

  Author: {
    posts: (author: AuthorType) =>
      posts.filter(({ authorId }) => authorId === author.id),
  },

  Post: {
    author: (post: PostType) =>
      authors.find((author) => author.id === post.authorId),
  },
};
