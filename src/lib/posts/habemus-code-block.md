---
title: Habemus Code Block
date: "2026-08-31T00:10:00"
tags: ["Svelte", "SvelteKit", "Blog Building"]
description: The code component is here!
---

Good news! The code block component is working:

```ts filename="src/lib/posts.ts"
export const postsList: Array<{
  title: string;
  date: string;
  tags: string[];
  description?: string;
  slug: string;
}> = [];
```

Above (for the sake of testing the component) is the array used to store all
blog posts, each with its respective metadata, and below is this post
frontmatter. The component shows line numbers, allows copying the code and
supports highlighting one or multiple lines:

```yaml {2,4-5} filename="habemus-code-block.md"
---
title: Habemus Code Block
date: "2026-08-31T00:00:00"
tags: ["Svelte", "SvelteKit", "Blog Building"]
description: The code component is here!
---
```

I'm still figuring some things out but that's probably enough to show you the
inner workings!
