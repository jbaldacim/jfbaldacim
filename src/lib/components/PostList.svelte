<script lang="ts">
	import type { Post } from '$lib/posts';
	import PostCard from './PostCard.svelte';
	import { motion } from '@humanspeak/svelte-motion';
	import { flyBlur } from '$lib/transitions';
	import { cubicOut } from 'svelte/easing';
	import { flip } from 'svelte/animate';

	interface Props {
		posts: Post[];
		variant?: 'home' | 'paginated';
		direction?: number;
	}

	let { posts, variant = 'paginated', direction = 1 }: Props = $props();

	const xDisplacement = 36;
	const duration = 0.4;
</script>

<div class="relative">
	{#if variant === 'home'}
		<div class="flex flex-col gap-4">
			{#each posts as post, i (post.slug)}
				<motion.div
					initial={{ opacity: 0, x: -xDisplacement, filter: 'blur(4px)' }}
					whileInView={{
						opacity: 1,
						x: 0,
						filter: 'blur(0px)',
						transition: { duration: duration, delay: i * 0.08, ease: 'easeOut' }
					}}
					viewport={{ once: true, margin: '-40px' }}
					key={post.slug}
				>
					<PostCard {post} />
				</motion.div>
			{:else}
				<p class="text-sm font-light text-muted-foreground">No posts yet — check back soon.</p>
			{/each}
		</div>
	{:else}
		<div class="grid grid-cols-1 gap-4">
			{#each posts as post, i (post.slug)}
				<div
					style="grid-row-start: {i + 1}; grid-column-start: 1;"
					in:flyBlur={{
						x: direction > 0 ? xDisplacement : -xDisplacement,
						duration: 350,
						delay: i * 50 + 150,
						blur: 4,
						easing: cubicOut
					}}
					// out:flyBlur={{
					// 	x: direction > 0 ? -xDisplacement : xDisplacement,
					// 	duration: 250,
					// 	delay: i * 30,
					// 	blur: 4,
					// 	easing: cubicIn
					// }}
					animate:flip={{ duration: 350 }}
				>
					<PostCard {post} />
				</div>
			{:else}
				<p class="text-sm font-light text-muted-foreground">No posts yet — check back soon.</p>
			{/each}
		</div>
	{/if}
</div>
