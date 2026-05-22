<!-- TODO - Remove this and shadcn-svelte -->
<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import { cn, type WithElementRef } from "$lib/utils.js";
  import {
    fly,
    type FlyParams,
    type TransitionConfig,
  } from "svelte/transition";
  import { onMount } from "svelte";

  let mounted = $state(false);
  let innerWidth = $state(0);

  onMount(() => {
    mounted = true;
  });

  function transition(
    node: Element,
    options: {
      reg: typeof fly;
      regArgs: FlyParams;
      small: typeof fly;
      smallArgs: FlyParams;
    },
  ): TransitionConfig {
    if (innerWidth > 640) {
      return options.reg(node, options.regArgs);
    }
    return options.small(node, options.smallArgs);
  }

  let {
    ref = $bindable(null),
    class: className,
    children,
    size = "default",
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
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
    size?: "default" | "sm";
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

<svelte:window bind:innerWidth />
{#if mounted}
  <div
    bind:this={ref}
    data-slot="card"
    data-size={size}
    class={cn(
      "ring-foreground/10 bg-card text-card-foreground gap-4 overflow-hidden rounded-xl py-6 text-sm ring-1 has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:gap-3 data-[size=sm]:py-3 data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl group/card flex flex-col",
      className,
    )}
    in:transition={{
      reg: fly,
      regArgs: {
        x: largeX,
        y: largeY,
        duration: largeDuration,
        delay: largeDelay,
      },
      small: fly,
      smallArgs: {
        x: smallX,
        y: smallY,
        duration: smallDuration,
        delay: smallDelay,
      },
    }}
    {...restProps}
  >
    {@render children?.()}
  </div>
{/if}
