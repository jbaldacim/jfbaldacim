<script>
	import About from '$lib/components/About.svelte';
	import Stack from '$lib/components/Stack.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import LatestPosts from '$lib/components/LatestPosts.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>João Baldacim</title>
	<meta name="description" content="João Baldacim's website" />
</svelte:head>

<Hero />
<About />
<Stack />
<LatestPosts posts={data.latestPosts} />
