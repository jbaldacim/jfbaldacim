<script>
  import BentoCard from "./BentoCard.svelte";

  let { class: className = "" } = $props();
</script>

<BentoCard
  title="Projects"
  class={className}
  largeX={200}
  largeDuration={750}
  largeDelay={850}
>
  <p>Projects go here</p>
</BentoCard>
