<script lang="ts">
  import About from "$lib/components/About.svelte";
  import Copyright from "$lib/components/Copyright.svelte";
  import Currently from "$lib/components/Currently.svelte";
  import FromTheBlog from "$lib/components/FromTheBlog.svelte";
  import Menu from "$lib/components/Menu.svelte";
  import Projects from "$lib/components/Projects.svelte";
  import Quote from "$lib/components/Quote.svelte";
  import Stack from "$lib/components/Stack.svelte";
</script>

<main
  class="flex items-center justify-center max-w-7xl w-full mx-auto md:h-screen p-4 md:overflow-hidden"
>
  <section
    class="md:grid md:grid-cols-4 md:grid-rows-[auto_repeat(4,1fr)_auto] gap-3 p-6 rounded-xl md:h-full bg-background/50 flex flex-col lg:max-h-200"
  >
    <Menu />

    <About class="col-span-1 row-span-2" />

    <Stack class="col-span-1 row-span-2" />

    <FromTheBlog class="col-span-2 row-span-4" />

    <Currently class="col-span-2 row-span-1" />

    <Projects class="col-span-2 row-span-1" />

    <Quote />

    <Copyright />
  </section>
</main>
