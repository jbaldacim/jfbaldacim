<script lang="ts">
  import * as Card from "$lib/components/ui/card";
  import type { Snippet } from "svelte";
  import { cn } from "$lib/utils";
  import type { ClassValue } from "tailwind-variants";

  let {
    title,
    children,
    class: className,
    // Desktop/large screen transition props
    largeX = 0,
    largeY = 0,
    largeDuration = 0,
    largeDelay = 0,
    // Mobile/small screen transition props
    smallX = 0,
    smallY = 0,
    smallDuration = 0,
    smallDelay = 0,
  }: {
    title?: string;
    children: Snippet;
    class: ClassValue;
    // Large screen transition params
    largeX?: number;
    largeY?: number;
    largeDuration?: number;
    largeDelay?: number;
    // Small screen transition params
    smallX?: number;
    smallY?: number;
    smallDuration?: number;
    smallDelay?: number;
  } = $props();
</script>

<Card.Root
  class={cn("overflow-hidden", className)}
  {largeX}
  {largeY}
  {largeDuration}
  {largeDelay}
  {smallX}
  {smallY}
  {smallDuration}
  {smallDelay}
>
  {#if title}
    <Card.Header>
      <Card.Title class="text-xl uppercase text-semibold">{title}</Card.Title>
    </Card.Header>
  {/if}
  <Card.Content class="text-md">
    <!-- [&_p]:prose [&_p]:dark:prose-invert"> -->
    {@render children?.()}
  </Card.Content>
</Card.Root>
