<script lang="ts">
  import About from "$lib/components/About.svelte";
  import Menu from "$lib/components/Menu.svelte";
  import * as Card from "$lib/components/ui/card";
</script>

<main
  class="flex items-center justify-center min-h-screen max-w-7xl w-full mx-auto"
>
  <section class="grid grid-cols-10 grid-rows-10 gap-4 p-8">
    <Menu />
    <!-- Featured: spans 6 cols × 3 rows -->
    <About />

    <!-- Tall: spans 1 col × 2 rows -->
    <Card.Root class="col-span-4 row-span-2" x={200} delay={500}>
      <Card.Header>
        <Card.Title class="text-2xl">Stack</Card.Title>
        <Card.Description></Card.Description>
      </Card.Header>
      <Card.Content class="pb-2 text-lg [&>p]:prose [&>p]:dark:prose-invert">
        <p class="prose dark:prose-invert"></p>
      </Card.Content>
    </Card.Root>

    <!-- Wide: spans 3 cols × 1 row -->
    <Card.Root class="col-span-3" x={200} delay={750}>
      <Card.Content>...</Card.Content>
    </Card.Root>
  </section>
</main>
