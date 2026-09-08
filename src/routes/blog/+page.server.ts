import { getPosts } from '$lib/server/posts';

export const load = () => {
	return { posts: getPosts() };
};
