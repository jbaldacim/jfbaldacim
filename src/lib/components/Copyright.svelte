<script>
  import BentoCard from "./BentoCard.svelte";
</script>

<BentoCard
  class="col-span-1 row-span-1 flex items-center justify-center"
  largeY={200}
  largeDuration={750}
  largeDelay={750}
>
  <p>&copy; {new Date().getFullYear()} João Baldacim.</p>
</BentoCard>
