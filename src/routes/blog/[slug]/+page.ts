import type { PageLoad } from "./$types";
import { error } from "@sveltejs/kit";

export const load: PageLoad = async ({ params }) => {
  try {
    const post = await import(`../../../lib/posts/${params.slug}.md`);

    return {
      post: {
        component: post.default,
        metadata: post.metadata,
      },
    };
  } catch {
    error(404);
  }
};
