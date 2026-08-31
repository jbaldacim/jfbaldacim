<script lang="ts">
  import "./layout.css";
  import favicon from "$lib/assets/favicon.svg";
  import Menu from "$lib/components/Menu.svelte";

  let { children } = $props();
</script>

<svelte:head
  ><link rel="icon" href={favicon} /><title>João Baldacim</title></svelte:head
>

<div
  class="bg-[radial-gradient(ellipse_80%_80%_at_25%_25%,transparent_40%,var(--color-background)_100%),radial-gradient(var(--dot-color)_1px,transparent_1px)] bg-size-[auto,24px_24px] min-h-screen flex flex-col pt-16"
>
  <Menu />
  {@render children()}
</div>
