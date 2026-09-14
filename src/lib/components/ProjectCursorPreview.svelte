<script lang="ts">
	import type { Project } from '$lib/projects';
	import { Spring } from 'svelte/motion';

	interface Props {
		project?: Project;
		coords: Spring<{ x: number; y: number }>;
	}
	let { project, coords }: Props = $props();

	// CRT TV turn-on/off transition
	function crt(node: HTMLElement, { duration = 200 }) {
		return {
			duration,
			css: (t: number) => {
				// Phase 1 (0 to 0.5): Expand width horizontally from center dot to full line
				// Phase 2 (0.5 to 1.0): Expand height vertically from line to full window
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
	onmousemove={(event) => {
		coords.set({
			x: event.clientX,
			y: event.clientY
		});
	}}
/>

{#if project}
	<div
		transition:crt={{ duration: 200 }}
		class="pointer-events-none fixed z-50 hidden aspect-auto w-96 overflow-hidden bg-background shadow-2xl ring-1 ring-primary/40 select-none lg:block"
		style="
            left: {coords.current.x + 24}px;
            top: {coords.current.y - 120}px;
        "
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
