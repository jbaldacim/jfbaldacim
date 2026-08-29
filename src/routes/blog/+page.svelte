<script lang="ts">
  import { resolve } from "$app/paths";

  let { data } = $props();
</script>

{#each data.posts as post (post.slug)}
  <a href={resolve("/blog/[slug]", { slug: post.slug })}>{post.title}</a>
{/each}
