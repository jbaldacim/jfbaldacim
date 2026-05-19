<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import { cn, type WithElementRef } from "$lib/utils.js";
  import { fly } from "svelte/transition";
  import { onMount } from "svelte";
  let mounted = $state(false);
  onMount(() => {
    mounted = true;
  });

  let {
    ref = $bindable(null),
    class: className,
    children,
    size = "default",
    x = 0,
    y = 0,
    duration = 750,
    delay = 0,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
    size?: "default" | "sm";
    x?: number;
    y?: number;
    duration?: number;
    delay?: number;
  } = $props();
</script>

{#if mounted}
  <div
    bind:this={ref}
    data-slot="card"
    data-size={size}
    class={cn(
      "ring-foreground/10 bg-card text-card-foreground gap-4 overflow-hidden rounded-xl py-4 text-sm ring-1 has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:gap-3 data-[size=sm]:py-3 data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl group/card flex flex-col",
      className
    )}
    in:fly={{ x: x, y: y, duration: duration, delay: delay }}
    {...restProps}
  >
    {@render children?.()}
  </div>
{/if}
