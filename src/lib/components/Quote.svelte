<!-- TODO - fix uncentered text, it might have to do with leading -->
<script>
  import { cn } from "$lib/utils";
  import BentoCard from "./BentoCard.svelte";

  let { class: className = "" } = $props();
</script>

<BentoCard
  class={cn("flex items-center justify-center", className)}
  largeY={200}
  largeDuration={750}
  largeDelay={750}
>
  <blockquote class="italic">
    <p>
      "It is a capital mistake to theorise before one has data. Insensibly one
      begins to twist facts to suit theories, instead of theories to suit
      facts." — Sir Arthur Conan Doyle
    </p>
  </blockquote>
</BentoCard>
