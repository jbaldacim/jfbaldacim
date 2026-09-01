---
title: The Inner Workings
date: "2026-09-01T00:51:00"
tags: ["Svelte", "SvelteKit", "Blog Building"]
description: As the blog main feature works, it's time I show how
---

<script>
  import Note from "$lib/components/Note.svelte"
</script>

I had never built a blog. Hell, I had never even written a blog post! But due to
a quite large feeling of frustration — both with the quality of content nowadays
and with its presentation — and the will to talk about what makes me happy, I
decided to build my own blog. As a terrific bonus, teaching is an amazing way to
assess your own knowledge and fill the gaps, so I'll also be doing it.

So far it's been quite a pleasurable SvelteKit ride and I hope this first
_serious_ post helps you!

<Note type='warning'>
  While creating my project I had the wizard install and set <code>mdsvex</code> up, which is the markdown preprocessor for Svelte. It basically transforms any markdown file into something Svelte can understand. A quick look at SvelteKit documentation can show you how to add it if it's not in your config files. 
</Note>

## The Firstborn

Let's begin by making a new blog post at `src/lib/posts/hello-world.md`. Our
posts will simply be markdown files with a frontmatter, which is a block of data
at the top enclosed by a set of two `---`.

```md filename="src/lib/posts/hello-world.md"
---
title: Hello, world!
date: "2026-08-31"
tags: ["My tag", "Svelte"]
description: My first blog post, yay!
---

Hello, world!
```

With `mdsvex`, anything in the frontmatter is exposed in a `.metadata` property,
together with the component to be rendered in a `.default`.

## The Index

In order to get all articles and their respective metadata, we'll create
`src/lib/posts.ts` and use Vite `import.meta.glob(pattern, { eager: true })` to
scan the project at build time for files matching the given pattern: a path with
the markdown extension where our blog posts live. The return — let's call it
`posts` — is an object with each key being a file path and each value the
respective module object.

For each key-value pair in `posts`, we want to get a slug (a part of a URL that
uniquely identifies it) and the metadata. After that, we can sort the array so
new posts show first!

```ts filename="src/lib/posts.ts"
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
```

Now that we have all our posts ready, we can leverage Svelte `load` functions:
each `+page.svelte` can have a sibling `+page.ts` (or `.js`) exporting a `load`
function whose return is available to the page in the `data` prop.

```ts filename="src/routes/blog/+page.ts"
import { postsList } from "$lib/posts";

export const load = () => {
  return { posts: postsList };
};
```

Then we use that function in the `+page.svelte`:

```svelte filename="src/routes/blog/+page.svelte"
<script lang="ts">
  import { resolve } from "$app/paths";

  let { data } = $props();
</script>

{#each data.posts as post (post.slug)}
  <a href={resolve("/blog/[slug]", { slug: post.slug })}>
    {post.title}
  </a>
{:else}
  <p>No posts yet — check back soon.</p>
{/each}
```

And we're done with listing posts! In your /blog route you'll find all your blog
posts. But what is going to be rendered when we access a post? Onwards to find
out!

## The Vessel

The process of rendering a specific article requires the slug, which we already
have, and a route using the slug as a dynamic parameter. To do that in
SvelteKit, we simply create a route using square brackets! That means we need a
`src/routes/blog/[slug]/+page.svelte` and its sibling `+page.ts`.

As before, `load` functions are our friends. But this one will be just a tiny
bit different: it's going to use the `params` object available to them, which
contains the current route parameters. For instance, in a `/blog/[slug]` route
with `/blog/hello-world` URL, `params` would be

```json
{
  "slug": "hello-world"
}
```

It will also be `async` because we need a dynamic import, and since it can throw
(when it fails) we use a `try...catch` block. SvelteKit `error()` can be used,
just make sure not to `catch (err)` as doing so prevents the framework from
handling it. With `default` and `metadata` properties (shown above) available,
we're ready to consume it inside `+page.svelte`.

```ts filename="src/routes/blog/[slug]/+page.ts"
import { error } from "@sveltejs/kit";

export const load = async ({ params }) => {
  try {
    const post = await import(`$lib/posts/${params.slug}.md`);

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
```

Once again, we reach for the `data` prop, this time deriving the component as
`Component` (capitalization tells Svelte it's a component and not a regular HTML
element). Since `data` changes on a per-page basis, `$derived()` is needed.

```svelte filename="src/routes/blog/[slug]/+page.svelte"
<script lang="ts">
  let { data } = $props();

  const post = $derived(data.post);
  const Component = $derived(post.component);
</script>

<h1>{post.metadata.title}</h1>
<span>{post.metadata.date}</span>

<Component />
```

And there we have it! Now go write your first post!
