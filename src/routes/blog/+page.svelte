<script lang="ts">
  import CategoriesFilter from "$lib/components/CategoriesFilter.svelte";
  import PostList from "$lib/components/PostList.svelte";

  let { data } = $props();

  const tags = data.posts
    .map((post) => post.tags)
    .flat()
    .filter(Boolean);

  const uniqueTags = [...new Set(tags)];

  let activeTags: string[] = $state([]);

  let filteredPosts = $derived(
    data.posts
      .filter(
        (post) =>
          activeTags.length == 0 ||
          activeTags.every((tag) => post.tags?.includes(tag)),
      )
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
  );
</script>

<svelte:head>
  <title>Blog · João Baldacim</title>
</svelte:head>

<main class="max-w-350 mx-auto p-4 md:p-6 w-full flex-1">
  <h1 class="text-3xl font-semibold font-heading">Blog</h1>
  <div class="grid lg:grid-cols-[1fr_200px] pt-6 gap-4">
    <div class="flex flex-col gap-4">
      <PostList posts={filteredPosts} />
    </div>
    <aside class="hidden lg:block">
      <CategoriesFilter tags={uniqueTags} bind:selected={activeTags} />
    </aside>
  </div>
</main>
