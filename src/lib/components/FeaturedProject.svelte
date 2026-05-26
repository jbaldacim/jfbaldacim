<script>
  import BentoCard from "./BentoCard.svelte";

  let { class: className = "", href = null } = $props();
</script>

<BentoCard
  title="Featured Project"
  class={className}
  largeX={200}
  largeDuration={750}
  largeDelay={850}
  {href}
>
  Pisa 2022
</BentoCard>
