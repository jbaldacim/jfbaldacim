<script>
  import { resolve } from "$app/paths";
  import { fly } from "svelte/transition";
  import ModeToggle from "./ModeToggle.svelte";
  import { onMount } from "svelte";

  let mounted = $state(false);
  onMount(() => {
    mounted = true;
  });
</script>

{#if mounted}
  <nav
    class="flex flex-row items-center justify-between col-span-full row-span-1 ring-foreground/10 bg-card rounded-xl p-4 ring-1 px-6 hover:ring-primary transition-shadow duration-300 group"
    in:fly={{ x: -200, duration: 750, delay: 250 }}
  >
    <div>
      <span
        class="tracking-wide font-bold uppercase group-hover:text-primary transition-colors duration-300"
      >
        João Fleury Baldacim
      </span>
    </div>
    <div
      class="flex flex-row gap-2 items-center [&>a]:hover:text-primary tracking-wider transition-colors duration-300"
    >
      <a href={resolve("/about")}>About</a>
      <a href={resolve("/blog")}>Blog</a>
      <a href={resolve("/")}>Projects</a>
      <a href={resolve("/")}>Contact</a>
      <ModeToggle />
    </div>
  </nav>
{/if}
