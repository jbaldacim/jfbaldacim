<script>
  import BentoCard from "./BentoCard.svelte";

  let { class: className = "", href = null } = $props();
</script>

<BentoCard
  title="Blog"
  class={className}
  largeX={200}
  largeDuration={750}
  largeDelay={850}
  {href}
></BentoCard>
