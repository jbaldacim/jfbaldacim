interface PostMetadata {
  title: string;
  date: string;
  tags: string[];
  description?: string;
}

type Post = PostMetadata & { slug: string };

const posts = import.meta.glob<{
  metadata: PostMetadata;
}>("/src/lib/posts/*.md", { eager: true });

export const postsList: Array<Post> = Object.entries(posts)
  .map(
    ([key, value]): Post => ({
      ...value.metadata,
      slug: key.split("/").at(-1)!.replace(/\.md$/, ""),
    }),
  )
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
