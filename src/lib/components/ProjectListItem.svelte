<script lang="ts">
	import { resolve } from '$app/paths';
	import { availableIcons } from '$lib/icons';
	import type { Project } from '$lib/projects';
	import RepulsionGrid from './RepulsionGrid.svelte';

	interface Props {
		project: Project;
		active?: boolean;
		onmouseenter?: (project: Project) => void;
		onmouseleave?: () => void;
	}

	let { project, active = false, onmouseenter, onmouseleave }: Props = $props();

	const iconSize = 48;
	const dotScale = 0.205;
</script>

<a
	class="relative flex h-full w-full flex-col items-center justify-center gap-8 px-6 text-center font-mono {active
		? 'bg-primary/15 ring-1 ring-primary'
		: 'bg-card ring-1 ring-foreground/30'}"
	onmouseenter={() => onmouseenter?.(project)}
	onmouseleave={() => onmouseleave?.()}
	href={resolve(project.path)}
>
	<h2 class="text-3xl transition-transform duration-300">
		{project.title}
	</h2>
	<p class="sr-only">{project.description}</p>
	<div class="absolute bottom-6 left-6 grid grid-cols-3 gap-4">
		{#each project.stack as tech (tech)}
			{@const icon = availableIcons[tech.toLowerCase()]}
			{#if icon}
				<RepulsionGrid
					{...icon}
					renderMode="svg"
					strength={0}
					width={iconSize}
					height={iconSize}
					{dotScale}
					title=""
					style="shape-rendering: geometricPrecision; vector-effect: non-scaling-stroke"
				/>
			{/if}
		{/each}
	</div>
</a>
