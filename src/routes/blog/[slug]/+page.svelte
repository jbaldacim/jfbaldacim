<script lang="ts">
	import { resolve } from '$app/paths';
	import { copyCode } from '$lib/actions/copyCode.js';
	import Badge from '$lib/components/Badge.svelte';

	let { data } = $props();

	const post = $derived(data.post);
	const Component = $derived(post.component);
</script>

<svelte:head>
	<title>{post.metadata.title} · João Baldacim</title>
</svelte:head>

<main class="mx-auto w-full max-w-4xl flex-1 bg-background p-4 pt-20! md:p-6 md:pt-22!">
	<a
		href={resolve('/blog')}
		class="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors duration-300 hover:text-primary"
	>
		← Back to blog
	</a>
	<header class="mt-4 mb-8 flex flex-col gap-3">
		<h1 class="font-heading text-3xl font-semibold">{post.metadata.title}</h1>

		<div class="flex flex-wrap items-center gap-3">
			<span class="text-xs tracking-wide text-muted-foreground uppercase">
				{new Date(post.metadata.date).toLocaleDateString('en-US', {
					year: 'numeric',
					month: 'long',
					day: 'numeric'
				})}
			</span>

			{#if post.metadata.tags?.length}
				<div class="flex flex-wrap gap-2">
					{#each post.metadata.tags as tag (tag)}
						<Badge>{tag}</Badge>
					{/each}
				</div>
			{/if}
		</div>
	</header>

	<article
		class="prose mb-16 max-w-none prose-invert md:min-w-full prose-headings:font-heading prose-a:text-primary"
		use:copyCode
	>
		<Component />
	</article>
</main>
