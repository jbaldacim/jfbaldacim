<script lang="ts">
  import BentoCard from "./BentoCard.svelte";

  let { class: className = "" } = $props();
</script>

<BentoCard
  title="Stack"
  class={className}
  largeX={200}
  largeDuration={750}
  largeDelay={600}
  smallX={-200}
  smallDuration={750}
  smallDelay={600}
>
  <p>
    While building for the web, I am familiar with TypeScript, React & Next.js,
    Svelte & SvelteKit, Vite and Tailwind. For data visualization, I work
    primarily with D3, and any other data task is done with Python and its data
    ecosystem.
  </p>
</BentoCard>
