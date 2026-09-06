<script lang="ts">
  import type { Post } from "$lib/posts";
  import PostCard from "./PostCard.svelte";

  let { posts }: { posts: Post[] } = $props();
</script>

{#each posts as post (post.slug)}
  <PostCard {post} />
{:else}
  <p class="text-muted-foreground">No posts yet — check back soon.</p>
{/each}
