<script lang="ts">
	import ProjectCursorPreview from '$lib/components/ProjectCursorPreview.svelte';
	import ProjectList from '$lib/components/ProjectList.svelte';
	import type { Project } from '$lib/projects';

	const projects: Project[] = [
		{
			id: 1,
			title: 'Weissraum',
			description: 'A personal Cognitive Behavioral Therapy Underlying Assumptions tracker',
			image: '/weissraum/weissraum-home.webp',
			stack: ['React', 'Vite', 'styled-components'],
			path: '/projects/weissraum'
		},
		{
			id: 2,
			title: 'Climatech',
			description: 'HVAC Company Landing Page',
			image: '/climatech/climatech-home.webp',
			stack: ['React', 'Next.js', 'Tailwind'],
			path: '/projects/climatech'
		}
	];

	let activeProject: Project | undefined = $state();
</script>

<svelte:head>
	<title>Projects • João Baldacim</title>
	<meta name="description" content="João Baldacim's website" />
</svelte:head>

<main class="mx-auto flex w-full max-w-350 flex-1 flex-col overflow-x-clip p-4 md:p-6">
	<h1 class="font-heading text-3xl font-semibold">Projects</h1>

	<ProjectList {projects} bind:activeProject />
</main>

<ProjectCursorPreview project={activeProject} />
