<script>
  import { onMount } from "svelte";

  import * as Card from "$lib/components/ui/card";

  let mounted = $state(false);
  onMount(() => {
    mounted = true;
  });
</script>

{#if mounted}
  <Card.Root class="col-span-6 row-span-3 overflow-hidden" x={-200} delay={250}>
    <Card.Header>
      <Card.Title class="text-2xl">Hey, there!</Card.Title>
      <Card.Description></Card.Description>
    </Card.Header>
    <Card.Content class="pb-2 text-lg [&>p]:prose [&>p]:dark:prose-invert">
      <p>
        I'm João, a Systems Analysis and Development undergrad building a career
        in Software Engineering. I geek out over Front-End Development, Data
        Visualization, and Machine Learning — turning ideas into functional and
        beautiful solutions.
      </p>
      <p class="pt-2">
        Problem-solving, storytelling, and knowledge sharing are some of my
        passions, so I'm always happy to share what I learn. Let’s connect or
        collaborate!
      </p>
    </Card.Content>
  </Card.Root>
{/if}
