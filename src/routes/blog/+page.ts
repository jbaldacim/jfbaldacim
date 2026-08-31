import { postsList } from "$lib/posts";

export const load = () => {
  return { posts: postsList };
};
