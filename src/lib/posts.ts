export interface PostMetadata {
	title: string;
	date: string;
	tags: string[];
	description?: string;
}

export type Post = PostMetadata & { slug: string };
