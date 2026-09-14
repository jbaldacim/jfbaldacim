<script lang="ts">
	import type { Project } from '$lib/projects';
	import { Spring } from 'svelte/motion';

	let { project }: { project?: Project } = $props();

	const coords = new Spring(
		{ x: 0, y: 0 },
		{
			stiffness: 0.12,
			damping: 0.6
		}
	);
</script>

<svelte:window
	onmousemove={(event) => {
		coords.set({
			x: event.clientX,
			y: event.clientY
		});
	}}
/>

<div
	class="pointer-events-none fixed z-50 hidden aspect-auto w-96 overflow-hidden bg-background shadow-2xl ring-1 ring-primary/40 transition-opacity duration-300 select-none lg:block
		{project ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}"
	style="
		left: {coords.current.x + 24}px;
		top: {coords.current.y - 120}px;
	"
>
	{#if project}
		<div class="relative h-full w-full overflow-hidden bg-muted/40">
			<img alt={project.title} src={project.image} class="h-full w-full object-cover" />
		</div>
	{/if}
</div>
