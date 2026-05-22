<script>
  import { cn } from "$lib/utils";
  import BentoCard from "./BentoCard.svelte";

  let { class: className = "" } = $props();
</script>

<BentoCard
  class={cn("flex items-center justify-center text-center", className)}
  largeY={200}
  largeDuration={750}
  largeDelay={750}
>
  <p>&copy; {new Date().getFullYear()} ...</p>
</BentoCard>
