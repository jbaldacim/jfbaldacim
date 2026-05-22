<!-- BLOG PROJECTS - Talk about how I changed params for this component to enable transitions -->
<!-- TODO -  Explore card colors -->
<!-- TODO - Explore the possibility of using springs for transitions -->
<!-- TODO - Accept href and render anchor -->

<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn, type WithElementRef } from "$lib/utils";
  import type { ClassValue } from "tailwind-variants";

  import {
    fly,
    type FlyParams,
    type TransitionConfig,
  } from "svelte/transition";
  import { onMount } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

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
    href = null,
  }: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
    title?: string;
    children?: Snippet;
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
    href?: string | null;
  } = $props();
</script>

<svelte:window bind:innerWidth />
{#if mounted}
  <div
    bind:this={ref}
    class={cn(
      "flex flex-col h-full w-full items-start justify-start gap-4 col-span-full row-span-1 ring-foreground/10 bg-card rounded-xl p-6 ring-1 hover:ring-primary transition-all duration-300 group overflow-hidden",
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
  >
    {#if title}
      <div
        class="text-lg uppercase text-semibold group-hover:text-primary transition-colors duration-300 tracking-tight font-heading font-medium"
      >
        <h2>{title}</h2>
      </div>
    {/if}
    <div class="text-sm leading-6">
      {@render children?.()}
    </div>
  </div>
{/if}

<!-- <Card.Root
  class={cn(
    "overflow-hidden hover:ring-primary transition-all duration-300 group",
    className,
  )}
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
      <Card.Title
        class="text-lg uppercase text-semibold group-hover:text-primary transition-colors duration-300 tracking-tight"
      >
        <h2>
          {title}
        </h2>
      </Card.Title>
    </Card.Header>
  {/if}
  <Card.Content class="text-sm leading-6">
    {@render children?.()}
  </Card.Content>
</Card.Root> -->
