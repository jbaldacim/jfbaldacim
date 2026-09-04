<script lang="ts">
  import { afterNavigate } from "$app/navigation";
  import { resolve } from "$app/paths";
  import { page } from "$app/state";
  import type { Pathname } from "$app/types";

  let currentPage = $derived(page.url.pathname);
  let isMenuOpen = $state(false);
  const isActive = (path: Pathname) =>
    path === "/" ? currentPage === "/" : currentPage.startsWith(path);

  afterNavigate(() => {
    isMenuOpen = false;
  });

  interface NavLink {
    path: Pathname;
    text: string;
  }

  const navLinks: NavLink[] = [
    { path: "/", text: "Home" },
    { path: "/about", text: "About" },
    { path: "/blog", text: "Blog" },
    { path: "/projects", text: "Projects" },
    { path: "/", text: "Contact" },
  ];
</script>

{#snippet navItem(link: NavLink, mobile = false)}
  <a
    href={resolve(link.path)}
    aria-current={isActive(link.path) ? "page" : undefined}
    onclick={() => {
      if (mobile) isMenuOpen = false;
    }}
    class={[
      "flex items-center justify-center px-2",
      mobile ? "py-2 w-full" : "h-full border-y-2 border-card",
      {
        "text-primary border-b-primary": isActive(link.path),
        "hover:border-b-primary/15 hover:text-primary": !isActive(link.path),
      },
    ]}
  >
    {link.text}
  </a>
{/snippet}

<nav
  class="flex flex-row items-center justify-between bg-card px-6 duration-300 fixed top-0 left-0 w-full border-b z-50 h-16"
>
  <span
    class="tracking-wide font-bold uppercase hover:text-primary transition-colors duration-300"
  >
    <a href={resolve("/")}>João Baldacim</a>
  </span>
  <!-- Desktop menu -->
  <div
    class="hidden md:grid grid-cols-5 gap-4 items-center tracking-wider transition-colors duration-300 h-full"
  >
    {#each navLinks as navLink (navLink.text)}
      {@render navItem(navLink)}
    {/each}
  </div>
  <!-- Mobile menu -->
  {#if isMenuOpen}
    <div
      id="mobile-menu"
      class="md:hidden flex flex-col items-center justify-center gap-2 tracking-wider absolute top-full left-0 w-full bg-card border-b py-2"
    >
      {#each navLinks as navLink (navLink.text)}
        {@render navItem(navLink, true)}
      {/each}
    </div>
  {/if}
  <button
    class="burger-icon md:hidden"
    class:open={isMenuOpen}
    onclick={() => (isMenuOpen = !isMenuOpen)}
    aria-label="Toggle menu"
    aria-expanded={isMenuOpen}
    aria-controls="mobile-menu"
  >
    <span></span><span></span><span></span>
    <span></span><span></span><span></span>
  </button>
</nav>

<style>
  .burger-icon {
    width: 28px;
    height: 20px;
    position: relative;
    background: none;
    border: none;
    padding: 0;
    transition: 0.5s ease-in-out;
  }
  .burger-icon span {
    display: block;
    position: absolute;
    height: 4px;
    width: 50%;
    background: var(--color-foreground);
    transition: 0.25s ease-in-out;
  }
  .burger-icon span:nth-child(odd) {
    left: 0;
    border-radius: 4px 0 0 4px;
  }
  .burger-icon span:nth-child(even) {
    left: 50%;
    border-radius: 0 4px 4px 0;
  }
  .burger-icon span:nth-child(1),
  .burger-icon span:nth-child(2) {
    top: 0px;
  }
  .burger-icon span:nth-child(3),
  .burger-icon span:nth-child(4) {
    top: 8px;
  }
  .burger-icon span:nth-child(5),
  .burger-icon span:nth-child(6) {
    top: 16px;
  }

  .burger-icon.open span:nth-child(1),
  .burger-icon.open span:nth-child(6) {
    transform: rotate(45deg);
  }
  .burger-icon.open span:nth-child(2),
  .burger-icon.open span:nth-child(5) {
    transform: rotate(-45deg);
  }
  .burger-icon.open span:nth-child(1) {
    left: 3px;
    top: 3px;
  }
  .burger-icon.open span:nth-child(2) {
    left: calc(50% - 3px);
    top: 3px;
  }
  .burger-icon.open span:nth-child(3) {
    left: -50%;
    opacity: 0;
  }
  .burger-icon.open span:nth-child(4) {
    left: 100%;
    opacity: 0;
  }
  .burger-icon.open span:nth-child(5) {
    left: 3px;
    top: 13px;
  }
  .burger-icon.open span:nth-child(6) {
    left: calc(50% - 3px);
    top: 13px;
  }
</style>
