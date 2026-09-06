<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLButtonAttributes } from "svelte/elements";

  type Props = HTMLButtonAttributes & {
    as?: "button" | "span";
    active?: boolean;
    children: Snippet;
  };

  let {
    as = "span",
    active = false,
    class: className = "",
    children,
    ...restProps
  }: Props = $props();

  const baseClasses =
    "inline-flex items-center text-xs px-2 py-0.5 ring-1 transition-all duration-300 select-none ring-foreground-10 text-muted-foreground";

  const stateClasses = $derived(
    active
      ? "bg-primary/15 text-primary-foreground ring-primary"
      : "ring-foreground/10 text-muted-foreground",
  );

  const interactiveClasses = $derived(
    as === "button" ? "cursor-pointer hover:ring-primary" : "",
  );
</script>

<svelte:element
  this={as}
  type={as === "button" ? (restProps.type ?? "button") : undefined}
  class="{baseClasses} {stateClasses} {interactiveClasses} {className}"
  {...restProps}
>
  {@render children()}
</svelte:element>
