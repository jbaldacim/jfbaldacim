<script lang="ts">
  import BentoCard from "./BentoCard.svelte";

  let { class: className = "" } = $props();
</script>

<BentoCard
  title="Currently"
  class={className}
  largeX={200}
  largeDuration={750}
  largeDelay={600}
  smallX={-200}
  smallDuration={750}
  smallDelay={600}
>
  <p>
    Systems Analysis and Development undergraduate student at IFSP — Campus
    Boituva.
  </p>
</BentoCard>
