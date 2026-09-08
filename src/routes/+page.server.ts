import { getPosts } from '$lib/server/posts';

export const load = async () => {
	const latestPosts = getPosts().slice(0, 3);

	return { latestPosts };
};
