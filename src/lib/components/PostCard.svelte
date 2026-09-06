<script lang="ts">
  import { resolve } from "$app/paths";
  import type { Post } from "$lib/posts";
  import Badge from "./Badge.svelte";
  let { post }: { post: Post } = $props();
</script>

<a
  href={resolve("/blog/[slug]", { slug: post.slug })}
  class="flex flex-col gap-2 border-t border-foreground/10 bg-card p-6 hover:border-primary transition-all duration-300 group"
>
  <h2 class="text-xl font-semibold font-heading transition-colors duration-300">
    {post.title}
  </h2>
  {#if post.description}
    <p class="text-muted-foreground">{post.description}</p>
  {/if}
  <div class="flex items-center gap-3 flex-wrap">
    <span class="text-xs uppercase tracking-wide text-muted-foreground">
      {new Date(post.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })}
    </span>

    {#if post.tags?.length}
      <div class="flex gap-2 flex-wrap">
        {#each post.tags as tag (tag)}
          <Badge>{tag}</Badge>
        {/each}
      </div>
    {/if}
  </div>
</a>
