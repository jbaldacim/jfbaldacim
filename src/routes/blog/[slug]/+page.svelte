<script lang="ts">
  import Menu from "$lib/components/Menu.svelte";
  import { resolve } from "$app/paths";
  import { copyCode } from "$lib/actions/copyCode.js";

  let { data } = $props();

  const post = $derived(data.post);
  const Component = $derived(post.component);
</script>

<svelte:head>
  <title>{post.metadata.title} · João Fleury Baldacim</title>
</svelte:head>

<div
  class="bg-[radial-gradient(ellipse_80%_80%_at_25%_25%,transparent_40%,var(--color-background)_100%),radial-gradient(var(--dot-color)_1px,transparent_1px)] bg-size-[auto,24px_24px] min-h-screen flex flex-col pt-14.25"
>
  <Menu />
  <main class="max-w-4xl mx-auto p-4 md:p-6 bg-background flex-1 w-full">
    <a
      href={resolve("/blog")}
      class="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
    >
      ← Back to blog
    </a>
    <header class="mt-4 mb-8 flex flex-col gap-3">
      <h1 class="text-3xl font-bold font-heading">{post.metadata.title}</h1>

      <div class="flex items-center gap-3 flex-wrap">
        <span class="text-xs uppercase tracking-wide text-muted-foreground">
          {new Date(post.metadata.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>

        {#if post.metadata.tags?.length}
          <div class="flex gap-2 flex-wrap">
            {#each post.metadata.tags as tag (tag)}
              <span
                class="text-xs px-2 py-0.5 rounded-full ring-1 ring-foreground/10 bg-card text-muted-foreground"
              >
                {tag}
              </span>
            {/each}
          </div>
        {/if}
      </div>
    </header>

    <article
      class="prose prose-invert prose-headings:font-heading prose-a:text-primary max-w-none mb-16 md:min-w-full"
      use:copyCode
    >
      <Component />
    </article>
  </main>
</div>
