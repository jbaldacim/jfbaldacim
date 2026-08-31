<script lang="ts">
  import { resolve } from "$app/paths";

  let isMenuOpen = $state(false);
</script>

<nav
  class="flex flex-row items-center justify-between bg-card py-4 px-6 duration-300 group fixed top-0 left-0 w-full border-b z-50 h-16"
>
  <div>
    <span
      class="tracking-wide font-bold uppercase group-hover:text-primary transition-colors duration-300"
    >
      <a href={resolve("/")}>João Baldacim</a>
    </span>
  </div>
  <!-- Desktop menu -->
  <div
    class="hidden md:flex flex-row gap-2 items-center [&>a]:hover:text-primary tracking-wider transition-colors duration-300"
  >
    <a href={resolve("/about")}>About</a>
    <a href={resolve("/blog")}>Blog</a>
    <a href={resolve("/projects")}>Projects</a>
    <a href={resolve("/")}>Contact</a>
  </div>
  <!-- Mobile menu -->
  {#if isMenuOpen}
    <div
      class="md:hidden flex flex-col items-center justify-center gap-2 tracking-wider absolute top-full left-0 w-full bg-card border-b py-2"
    >
      <a href={resolve("/about")} onclick={() => (isMenuOpen = !isMenuOpen)}
        >About</a
      >
      <a href={resolve("/blog")} onclick={() => (isMenuOpen = !isMenuOpen)}
        >Blog</a
      >
      <a href={resolve("/projects")} onclick={() => (isMenuOpen = !isMenuOpen)}
        >Projects</a
      >
      <a href={resolve("/")} onclick={() => (isMenuOpen = !isMenuOpen)}
        >Contact</a
      >
    </div>
  {/if}
  <button
    class="burger-icon md:hidden"
    class:open={isMenuOpen}
    onclick={() => (isMenuOpen = !isMenuOpen)}
    aria-label="Toggle menu"
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
