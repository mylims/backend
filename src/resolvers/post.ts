import { posts, authors, Post as PostType } from '../connectors/example';

export const postResolver = {
  Query: {
    posts: () => posts,
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

  Post: {
    author: (post: PostType) =>
      authors.find((author) => author.id === post.authorId),
  },
};
