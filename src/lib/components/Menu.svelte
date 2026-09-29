<!--
    TODO - fix colors so burger animation shows
    TODO - solve scrollbar interfering with width
    TODO - fix transition on menu item hover
    TODO - add more stuff to full screen menu
-->
<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import type { Pathname } from '$app/types';
	import { fade } from 'svelte/transition';

	let { duration = 700 }: { duration?: number } = $props();
	let currentPage = $derived(page.url.pathname);
	let isMenuOpen = $state(false);

	const isActive = (path: Pathname) =>
		path === '/' ? currentPage === '/' : currentPage.startsWith(path);

	afterNavigate(() => {
		isMenuOpen = false;
	});

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'Escape' && isMenuOpen) {
			isMenuOpen = false;
		}
	}

	// Lock body scroll when menu overlay is open
	$effect(() => {
		if (typeof document !== 'undefined') {
			document.body.style.overflow = isMenuOpen ? 'hidden' : '';
		}
		return () => {
			if (typeof document !== 'undefined') document.body.style.overflow = '';
		};
	});

	interface NavLink {
		path: Pathname;
		text: string;
	}

	const navLinks: NavLink[] = [
		{ path: '/', text: 'Home' },
		{ path: '/about', text: 'About' },
		{ path: '/blog', text: 'Blog' },
		{ path: '/projects', text: 'Projects' },
		{ path: '/contact', text: 'Contact' }
	];
</script>

<svelte:window onkeydown={handleKeyDown} />

<!-- Fixed Navigation Header -->
<nav
	class="fixed top-0 left-0 z-50 flex h-16 w-full flex-row items-center justify-between px-6"
	in:fade={{ duration }}
>
	<span class="font-bold tracking-wide uppercase transition-colors duration-300 hover:text-primary">
		<a href={resolve('/')}>João Baldacim</a>
	</span>

	<!-- Burger toggle button (All Screen Sizes) -->
	<button
		class="burger-icon"
		class:open={isMenuOpen}
		onclick={() => (isMenuOpen = !isMenuOpen)}
		aria-label="Toggle menu"
		aria-expanded={isMenuOpen}
		aria-controls="fullscreen-menu"
	>
		<span></span><span></span><span></span>
		<span></span><span></span><span></span>
	</button>
</nav>

<!-- Fullscreen Circular Clip-Path Overlay (All Screen Sizes) -->
<div
	id="fullscreen-menu"
	class="fixed inset-0 z-40 flex h-dvh w-dvw flex-col items-center justify-center overflow-hidden bg-primary transition-[clip-path] duration-700 ease-[cubic-bezier(0.77,0,0.175,1)]"
	style="clip-path: circle({isMenuOpen ? '150%' : '0%'} at calc(100% - 1.5rem - 14px) 2rem);"
	inert={!isMenuOpen}
>
	<ul class="flex flex-col items-center gap-4 text-center md:gap-8">
		{#each navLinks as navLink, index (navLink.text)}
			<li>
				<a
					href={resolve(navLink.path)}
					aria-current={isActive(navLink.path) ? 'page' : undefined}
					class={[
						'inline-block text-4xl font-bold tracking-tight transition-all sm:text-6xl md:text-7xl',
						isActive(navLink.path) ? 'text-background' : 'hover:text-background/80'
					]}
					style="
						opacity: {isMenuOpen ? 1 : 0};
						transform: translateX({isMenuOpen ? '0px' : '100%'});
						transition-timing-function: {isMenuOpen
						? 'cubic-bezier(0.16, 1, 0.3, 1)'
						: 'cubic-bezier(0.7, 0, 0.84, 0)'};
						transition-delay: {isMenuOpen
						? `${250 + index * 60}ms`
						: `${(navLinks.length - 1 - index) * 30}ms`};
					"
				>
					{navLink.text}
				</a>
			</li>
		{/each}
	</ul>
</div>

<style>
	.burger-icon {
		width: 28px;
		height: 20px;
		position: relative;
		background: none;
		border: none;
		padding: 0;
		transition: 0.5s ease-in-out;
		cursor: pointer;
	}
	.burger-icon span {
		display: block;
		position: absolute;
		height: 4px;
		width: 50%;
		background: var(--color-foreground);
		transition:
			0.25s ease-in-out,
			background 0;
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
