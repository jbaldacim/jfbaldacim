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

<div
  class="bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,transparent_40%,var(--color-background)_100%),radial-gradient(var(--dot-color)_1px,transparent_1px)] bg-size-[auto,24px_24px]"
>
  <main
    class="flex items-center justify-center max-w-7xl w-full mx-auto md:h-screen p-4 md:overflow-hidden"
  >
    <section
      class="md:grid md:grid-cols-6 md:grid-rows-[auto_repeat(4,1fr)_auto] gap-3 p-6 rounded-xl md:h-full flex flex-col lg:max-h-200"
    >
      <Menu />

      <About class="col-span-2 row-span-2" />

      <Stack class="col-span-2 row-span-2" />

      <FromTheBlog class="col-span-2 row-span-4" />

      <Projects class="col-span-1 row-span-1" href="/projects" />

      <Currently class="col-span-4 row-span-1" />

      <Quote class="col-span-4 row-span-1" />

      <Copyright class="col-span-2 row-span-1" />
    </section>
  </main>
</div>
