<script lang="ts">
	import CategoriesFilter from '$lib/components/CategoriesFilter.svelte';
	import Pagination from '$lib/components/Pagination.svelte';
	import PostList from '$lib/components/PostList.svelte';
	import { extractUniqueTags, filterAndSortPosts, paginate } from '$lib/utils/posts.js';

	let { data } = $props();

	const uniqueTags = extractUniqueTags(data.posts);
	const perPage = 4;

	let activeTags: string[] = $state([]);
	let currentPage = $state(1);
	let previousPage = 0;
	let direction = $state(1);
	let filteredPosts = $derived(filterAndSortPosts(data.posts, activeTags));
	let totalPages = $derived(Math.ceil(filteredPosts.length / perPage) || 1);
	let paginatedPosts = $derived(paginate(filteredPosts, currentPage, perPage));

	$effect(() => {
		activeTags;
		currentPage = 1;
	});

	$effect.pre(() => {
		if (currentPage !== previousPage) {
			direction = currentPage >= previousPage ? 1 : -1;
			previousPage = currentPage;
		}
	});
</script>

<svelte:head>
	<title>Blog · João Baldacim</title>
</svelte:head>

<main class="mx-auto w-full max-w-350 flex-1 p-4 md:p-6">
	<h1 class="font-heading text-3xl font-semibold">Blog</h1>
	<div class="grid gap-4 pt-6 lg:grid-cols-[1fr_200px]">
		<div class="flex flex-col gap-4">
			<PostList posts={paginatedPosts} {direction} variant="paginated" />
			<Pagination bind:currentPage {totalPages} />
		</div>
		<aside class="hidden lg:block">
			<CategoriesFilter tags={uniqueTags} bind:selected={activeTags} />
		</aside>
	</div>
</main>
