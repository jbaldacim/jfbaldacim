<script lang="ts">
	import type { Post } from '$lib/posts';
	import PostCard from './PostCard.svelte';
	import { motion, AnimatePresence, type Variants } from '@humanspeak/svelte-motion';

	interface Props {
		posts: Post[];
		variant?: 'home' | 'paginated';
		direction?: number;
	}

	let { posts, variant = 'paginated', direction = 1 }: Props = $props();

	const xDisplacement = 36;
	const duration = 0.4;

	const paginatedVariants = (i: number): Variants => ({
		enter: (dir: unknown) => {
			return {
				opacity: 0,
				x: (dir as number) > 0 ? xDisplacement : -xDisplacement,
				filter: 'blur(4px)'
			};
		},
		center: {
			opacity: 1,
			x: 0,
			filter: 'blur(0px)',
			transition: { duration, delay: (i + 1) * 0.04 + duration / 2, ease: 'easeOut' }
		},
		exit: (dir: unknown) => {
			return {
				opacity: 0,
				x: (dir as number) > 0 ? -xDisplacement : xDisplacement,
				filter: 'blur(4px)',
				transition: { duration, delay: i * 0.04, ease: 'easeIn' }
			};
		}
	});
</script>

<div class="relative flex flex-col gap-4">
	{#if variant === 'home'}
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
	{:else}
		<AnimatePresence mode="popLayout" custom={direction} initial={false}>
			{#each posts as post, i (post.slug)}
				<motion.div
					layout
					custom={direction}
					variants={paginatedVariants(i)}
					initial="enter"
					animate="center"
					exit="exit"
					key={post.slug}
				>
					<PostCard {post} />
				</motion.div>
			{:else}
				<p class="text-sm font-light text-muted-foreground">No posts yet — check back soon.</p>
			{/each}
		</AnimatePresence>
	{/if}
</div>
