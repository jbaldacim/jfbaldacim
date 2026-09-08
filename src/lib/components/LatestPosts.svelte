<script lang="ts">
	import type { Post } from '$lib/posts';
	import PostList from '$lib/components/PostList.svelte';
	import { resolve } from '$app/paths';

	let { posts }: { posts: Post[] } = $props();
</script>

<section class="flex w-full items-center justify-center">
	<div class="w-full max-w-7xl p-8">
		<div class="flex items-end justify-between pb-6">
			<div>
				<h2 class="font-heading text-3xl font-semibold">Latest Posts</h2>
				<p class="mt-1 text-sm font-light text-muted-foreground">
					Thoughts on software engineering, front-end architecture, and data.
				</p>
			</div>

			<a
				href={resolve('/blog')}
				class="inline-flex items-center px-2.5 py-1 text-xs text-muted-foreground ring-1 ring-foreground/10 transition-all duration-300 select-none hover:text-foreground hover:ring-primary"
			>
				View all
			</a>
		</div>

		{#if posts.length > 0}
			<div class="flex flex-col gap-4">
				<PostList {posts} />
			</div>
		{:else}
			<p class="text-sm font-light text-muted-foreground">No posts published yet.</p>
		{/if}
	</div>
</section>
