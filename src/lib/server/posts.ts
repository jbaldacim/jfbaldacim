import type { Post, PostMetadata } from '$lib/posts';

const rawPosts = import.meta.glob<{
	metadata: PostMetadata;
}>('/src/lib/posts/*.md', { eager: true });

export const allPosts: Array<Post> = Object.entries(rawPosts)
	.map(([key, value]): Post => ({
		...value.metadata,
		slug: key.split('/').at(-1)!.replace(/\.md$/, '')
	}))
	.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export function getPosts(): Post[] {
	return allPosts;
}

// interface PaginatedPostOptions {
// 	page?: number;
// 	limit?: number;
// 	tag?: string;
// }

// export function getPaginatedPosts({ page = 1, limit = 10, tag }: PaginatedPostOptions = {}) {
// 	let filtered = allPosts;

// 	if (tag) {
// 		filtered = filtered.filter((post) => post.tags?.includes(tag));
// 	}

// 	const total = filtered.length;
// 	const totalPages = Math.ceil(total / limit) || 1;
// 	const offset = (page - 1) * limit;
// 	const posts = filtered.slice(offset, offset + limit);

// 	return {
// 		posts,
// 		total,
// 		page,
// 		totalPages,
// 		hasNextPage: page < totalPages,
// 		hasPrevPage: page > 1
// 	};
// }
