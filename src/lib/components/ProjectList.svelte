<script lang="ts">
	import type { Project } from '$lib/projects';
	import { Spring } from 'svelte/motion';
	import ProjectCursorPreview from './ProjectCursorPreview.svelte';
	import ProjectListItem from './ProjectListItem.svelte';

	interface Props {
		projects: Project[];
		activeProject?: Project;
	}

	let { projects, activeProject = $bindable() }: Props = $props();

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

<!--
    Could use
    class="grid-rows-[repeat(var(--project-count),minmax(0,1fr))]"
    with
    style={`--project-count: ${projects.length}`}
 -->
<div class="grid flex-1 grid-rows-3 gap-4 py-6">
	{#each projects as project (project.id)}
		<ProjectListItem
			{project}
			active={activeProject?.id === project.id}
			onmouseenter={(project) => (activeProject = project)}
			onmouseleave={() => (activeProject = undefined)}
		/>
		<ProjectCursorPreview project={activeProject} {coords} />
	{/each}
</div>
