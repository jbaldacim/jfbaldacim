<script lang="ts">
  import { resolve } from "$app/paths";

  let { data } = $props();
</script>

<svelte:head>
  <title>Blog · João Baldacim</title>
</svelte:head>

<main class="max-w-3xl mx-auto p-4 md:p-6 w-full flex-1">
  <h1 class="text-3xl font-bold font-heading mb-8">Blog</h1>

  <div class="flex flex-col gap-4">
    {#each data.posts as post (post.slug)}
      <a
        href={resolve("/blog/[slug]", { slug: post.slug })}
        class="flex flex-col gap-2 ring-1 ring-foreground/10 bg-card rounded-xl p-6 hover:ring-primary transition-all duration-300 group"
      >
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
                <span
                  class="text-xs px-2 py-0.5 rounded-full ring-1 ring-foreground/10 text-muted-foreground"
                >
                  {tag}
                </span>
              {/each}
            </div>
          {/if}
        </div>

        <h2
          class="text-xl font-semibold font-heading group-hover:text-primary transition-colors duration-300"
        >
          {post.title}
        </h2>
        {#if post.description}
          <p class="text-muted-foreground">{post.description}</p>
        {/if}
      </a>
    {:else}
      <p class="text-muted-foreground">No posts yet — check back soon.</p>
    {/each}
  </div>
</main>
