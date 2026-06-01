<script lang="ts">
  import About from "$lib/components/About.svelte";
  import Blog from "$lib/components/Blog.svelte";
  import Contact from "$lib/components/Contact.svelte";
  import Copyright from "$lib/components/Copyright.svelte";
  import Currently from "$lib/components/Currently.svelte";
  import FeaturedProject from "$lib/components/FeaturedProject.svelte";
  import FromTheBlog from "$lib/components/FromTheBlog.svelte";
  import Menu from "$lib/components/Menu.svelte";
  import OpenTo from "$lib/components/OpenTo.svelte";
  import Projects from "$lib/components/Projects.svelte";
  import Quote from "$lib/components/Quote.svelte";
  import Stack from "$lib/components/Stack.svelte";
</script>

<div
  class="bg-[radial-gradient(ellipse_80%_80%_at_25%_25%,transparent_40%,var(--color-background)_100%),radial-gradient(var(--dot-color)_1px,transparent_1px)] bg-size-[auto,24px_24px] flex items-center justify-center"
>
  <main
    class="flex items-center justify-center max-w-6xl md:h-screen p-4 overflow-hidden"
  >
    <section
      class="md:grid md:grid-cols-12 md:grid-rows-[auto_repeat(8,1fr)_auto] gap-3 p-6 rounded-xl md:h-full flex flex-col lg:max-h-215"
    >
      <Menu />

      <About class="col-span-5 row-span-3" />

      <Projects class="col-span-3 row-span-1" href="/projects" />

      <Stack class="col-span-4 row-span-3" />

      <FeaturedProject
        class="col-span-4 row-span-2"
        href="/projects/pisa-2022"
      />

      <Blog class="col-span-3 row-span-1" href="/blog" />

      <Contact class="col-span-3 row-span-1" href="/contact" />

      <Copyright class="col-span-3 row-span-1" />

      <!-- <FromTheBlog class="col-span-3 row-span-2" /> -->

      <!-- <Currently class="col-span-6 row-span-1" /> -->

      <!-- <OpenTo class="col-span-3 row-span-1" /> -->

      <!-- <Quote class="col-span-9 row-span-1" /> -->
    </section>
  </main>
</div>
