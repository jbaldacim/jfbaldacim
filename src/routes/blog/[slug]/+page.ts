import { error } from "@sveltejs/kit";

export const load = async ({ params }) => {
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
