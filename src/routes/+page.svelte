<script lang="ts">
  import About from "$lib/components/About.svelte";
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
    class="md:grid md:grid-cols-12 md:grid-rows-10 gap-3 p-6 rounded-xl md:h-full bg-background/50 flex flex-col"
  >
    <Menu />

    <About />

    <Stack />

    <Projects />

    <FromTheBlog />

    <Quote />
  </section>
</main>
