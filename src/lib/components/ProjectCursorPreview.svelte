<!-- ProjectPreviewClamp.svelte -->
<script lang="ts">
	import type { Project } from '$lib/projects';
	import { Spring } from 'svelte/motion';

	interface Props {
		project?: Project;
		coords: Spring<{ x: number; y: number }>;
	}

	let { project, coords }: Props = $props();

	let innerWidth = $state(0);
	let innerHeight = $state(0);

	const CARD_WIDTH = 384; // w-96 = 384px
	const CARD_ESTIMATED_HEIGHT = 260;
	const PADDING = 24;
	const OFFSET_X = 20;
	const OFFSET_Y = 24;

	let clampedX = $derived(
		Math.min(Math.max(PADDING, coords.current.x + OFFSET_X), innerWidth - CARD_WIDTH - PADDING)
	);

	let clampedY = $derived(
		Math.min(
			Math.max(PADDING, coords.current.y + OFFSET_Y),
			innerHeight - CARD_ESTIMATED_HEIGHT - PADDING
		)
	);
	function crt(node: HTMLElement, { duration = 200 }) {
		return {
			duration,
			css: (t: number) => {
				const tX = Math.min(1, t * 2);
				const tY = Math.max(0, (t - 0.5) * 2);
				const clipX = 50 * (1 - tX);
				const clipY = 50 * (1 - tY);
				return `clip-path: inset(${clipY}% ${clipX}% ${clipY}% ${clipX}%);`;
			}
		};
	}
</script>

<svelte:window
	bind:innerWidth
	bind:innerHeight
	onmousemove={(e) => coords.set({ x: e.clientX, y: e.clientY })}
/>

{#if project}
	<div
		transition:crt={{ duration: 200 }}
		class="pointer-events-none fixed z-50 hidden aspect-auto w-96 overflow-hidden bg-background shadow-2xl ring-1 ring-primary/40 select-none lg:block"
		style="left: {clampedX}px; top: {clampedY}px;"
		aria-hidden="true"
	>
		<div class="relative h-full w-full overflow-hidden bg-muted/40">
			<div class="bg-primary/15 p-2 text-center text-sm">{project.description}</div>
			<img
				alt={project.title}
				src={project.image}
				class="h-full w-full object-cover ring-1 ring-primary/40"
			/>
		</div>
	</div>
{/if}
