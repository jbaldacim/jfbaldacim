<script lang="ts">
	import type { Project } from '$lib/projects';
	import ProjectListItem from './ProjectListItem.svelte';

	interface Props {
		projects: Project[];
		activeProject?: Project;
	}

	let { projects, activeProject = $bindable() }: Props = $props();
</script>

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
	{/each}
</div>
