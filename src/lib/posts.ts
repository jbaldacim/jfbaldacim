const posts = import.meta.glob<{
  metadata: { title: string; date: string; tags: string[] };
}>("/src/lib/posts/*.md", { eager: true });

export const postsList: Array<{
  title: string;
  date: string;
  tags: string[];
  slug: string;
}> = [];

for (const [key, value] of Object.entries(posts)) {
  postsList.push({
    title: value.metadata.title,
    date: value.metadata.date,
    tags: value.metadata.tags,
    slug: key.split("/").at(-1)!.replace(/\.md$/, ""),
  });
}

postsList.sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
);
