const posts = import.meta.glob<{
  metadata: {
    title: string;
    date: string;
    tags: string[];
    description?: string;
  };
}>("/src/lib/posts/*.md", { eager: true });

export const postsList: Array<{
  title: string;
  date: string;
  tags: string[];
  description?: string;
  slug: string;
}> = [];

for (const [key, value] of Object.entries(posts)) {
  postsList.push({
    title: value.metadata.title,
    date: value.metadata.date,
    tags: value.metadata.tags,
    description: value.metadata.description,
    slug: key.split("/").at(-1)!.replace(/\.md$/, ""),
  });
}

postsList.sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
);
