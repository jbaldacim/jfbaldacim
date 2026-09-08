import type { Post } from '$lib/posts';

export function extractUniqueTags(posts: Post[]): string[] {
	return [...new Set(posts.flatMap((p) => p.tags ?? []))].filter(Boolean);
}

export function filterAndSortPosts(posts: Post[], activeTags: string[]): Post[] {
	return posts
		.filter(
			(post) => activeTags.length === 0 || activeTags.every((tag) => post.tags?.includes(tag))
		)
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function paginate<T>(items: T[], page: number, perPage: number): T[] {
	const offset = (page - 1) * perPage;
	return items.slice(offset, offset + perPage);
}
