<script lang="ts">
  import type { Snippet } from "svelte";
  import { resolve } from "$app/paths";
  import type { Pathname } from "$app/types";

  const currentYear = new Date().getFullYear();

  interface FooterLink {
    label: string;
    path?: Pathname;
    href?: string;
  }

  const internalLinks: FooterLink[] = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Blog", path: "/blog" },
    { label: "Projects", path: "/projects" },
  ];

  interface SocialLink {
    label: string;
    href: string;
    icon: Snippet;
  }

  const socialLinks: SocialLink[] = [
    { label: "GitHub", href: "https://github.com/jbaldacim", icon: githubIcon },
    {
      label: "LinkedIn",
      href: "https://linkedin.com/in/joãofleurybaldacim",
      icon: linkedinIcon,
    },
  ];
</script>

{#snippet githubIcon()}
  <svg class="size-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
{/snippet}

{#snippet linkedinIcon()}
  <svg class="size-5 fill-current" viewBox="0 0 32 32" aria-hidden="true">
    <path
      xmlns="http://www.w3.org/2000/svg"
      d="M28.778 1.004h-25.56c-0.008-0-0.017-0-0.027-0-1.199 0-2.172 0.964-2.186 2.159v25.672c0.014 1.196 0.987 2.161 2.186 2.161 0.010 0 0.019-0 0.029-0h25.555c0.008 0 0.018 0 0.028 0 1.2 0 2.175-0.963 2.194-2.159l0-0.002v-25.67c-0.019-1.197-0.994-2.161-2.195-2.161-0.010 0-0.019 0-0.029 0h0.001zM9.9 26.562h-4.454v-14.311h4.454zM7.674 10.293c-1.425 0-2.579-1.155-2.579-2.579s1.155-2.579 2.579-2.579c1.424 0 2.579 1.154 2.579 2.578v0c0 0.001 0 0.002 0 0.004 0 1.423-1.154 2.577-2.577 2.577-0.001 0-0.002 0-0.003 0h0zM26.556 26.562h-4.441v-6.959c0-1.66-0.034-3.795-2.314-3.795-2.316 0-2.669 1.806-2.669 3.673v7.082h-4.441v-14.311h4.266v1.951h0.058c0.828-1.395 2.326-2.315 4.039-2.315 0.061 0 0.121 0.001 0.181 0.003l-0.009-0c4.5 0 5.332 2.962 5.332 6.817v7.855z"
    />
  </svg>
{/snippet}

<footer
  class="w-full border-t bg-card text-muted-foreground transition-colors duration-300"
>
  <div
    class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-8 md:flex-row"
  >
    <!-- Brand / Copyright -->
    <div class="flex flex-col items-center gap-1 md:items-start">
      <a
        href={resolve("/")}
        class="font-bold uppercase tracking-wide text-foreground transition-colors duration-300 hover:text-primary"
      >
        João Baldacim
      </a>
      <p class="text-xs">
        &copy; {currentYear} - All rights reserved.
      </p>
      <p class="text-xs">Built with SvelteKit.</p>
    </div>

    <!-- Internal links -->
    <ul
      class="flex flex-wrap items-center justify-center gap-6 text-sm tracking-wider"
    >
      {#each internalLinks as link (link.label)}
        {#if link.path}
          <li>
            <a
              href={resolve(link.path)}
              class="transition-colors duration-200 hover:text-primary"
            >
              {link.label}
            </a>
          </li>
        {/if}
      {/each}
    </ul>

    <!-- External links -->
    <div class="flex items-center gap-4 text-sm">
      {#each socialLinks as social (social.label)}
        <a
          // data-sveltekit-reload
          href={social.href}
          target="_blank"
          rel="noreferrer noopener external"
          class="text-muted-foreground transition-colors duration-200 hover:text-primary"
        >
          <span class="sr-only">{social.label}</span>
          {@render social.icon()}
        </a>
      {/each}
    </div>
  </div>
</footer>
