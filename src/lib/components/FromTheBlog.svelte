<script>
  import BentoCard from "./BentoCard.svelte";

  let { class: className = "" } = $props();
</script>

<BentoCard
  title="From the blog"
  class={className}
  largeX={-200}
  largeDuration={750}
  largeDelay={600}
  smallX={200}
  smallDuration={750}
  smallDelay={700}
>
  <p>Posts from the blog.</p>
</BentoCard>
