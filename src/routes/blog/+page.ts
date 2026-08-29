import { postsList } from "$lib/posts";
import type { PageLoad } from "./$types";

export const load: PageLoad = () => {
  return { posts: postsList };
};
