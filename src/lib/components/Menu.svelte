<script lang="ts">
  import { resolve } from "$app/paths";
  import { fly } from "svelte/transition";
  import ModeToggle from "$lib/components/ModeToggle.svelte";
  import { onMount } from "svelte";

  let mounted = $state(false);
  onMount(() => {
    mounted = true;
  });
</script>

{#if mounted}
  <nav
    class="flex flex-row items-center justify-between bg-transparent py-4 px-6 duration-300 group fixed top-0 left-0 w-full border-b"
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
      <a href={resolve("/projects")}>Projects</a>
      <a href={resolve("/")}>Contact</a>
      <ModeToggle />
    </div>
  </nav>
{/if}
