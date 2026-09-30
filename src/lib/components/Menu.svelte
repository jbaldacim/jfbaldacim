<!-- 
    TODO - add more stuff to full screen menu
    TODO - fix scroll locking on open menu
    TODO - check tab locking on open menu
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
	let clickedIndex = $state<number | null>(null);

	const isActive = (path: Pathname) =>
		path === '/' ? currentPage === '/' : currentPage.startsWith(path);

	afterNavigate(() => {
		isMenuOpen = false;
	});

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'Escape' && isMenuOpen) {
			clickedIndex = null;
			isMenuOpen = false;
		}
	}

	function toggleMenu() {
		if (!isMenuOpen) {
			clickedIndex = null; // Reset clicked index when reopening
		}
		isMenuOpen = !isMenuOpen;
	}

	function handleLinkClick(index: number) {
		clickedIndex = index;
		isMenuOpen = false;
	}

	function getExitDelay(index: number, total: number): number {
		if (clickedIndex !== null) {
			const distance = Math.abs(index - clickedIndex);
			return distance * 40;
		}
		return (total - 1 - index) * 30;
	}

	function getExitDuration(index: number): number {
		if (clickedIndex !== null && index === clickedIndex) {
			return 180;
		}
		return 260;
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

	<!-- Burger toggle button -->
	<button
		class="burger-icon"
		class:open={isMenuOpen}
		onclick={toggleMenu}
		aria-label="Toggle menu"
		aria-expanded={isMenuOpen}
		aria-controls="fullscreen-menu"
	>
		<span></span><span></span><span></span>
		<span></span><span></span><span></span>
	</button>
</nav>

<!-- Fullscreen Circular Clip-Path Overlay -->
<div
	id="fullscreen-menu"
	class="fixed inset-0 z-40 flex h-dvh w-dvw flex-col items-center justify-center overflow-hidden bg-card transition-[clip-path] duration-700 ease-[cubic-bezier(0.77,0,0.175,1)]"
	style="clip-path: circle({isMenuOpen ? '150%' : '0%'} at calc(100% - 1.5rem - 14px) 2rem);"
	inert={!isMenuOpen}
>
	<ul class="flex flex-col items-center gap-4 text-center md:gap-8">
		{#each navLinks as navLink, index (navLink.text)}
			{@const enterDelay = `${250 + index * 60}ms`}
			{@const exitDelay = `${getExitDelay(index, navLinks.length)}ms`}
			{@const animDuration = isMenuOpen ? '400ms' : `${getExitDuration(index)}ms`}
			{@const animTiming = isMenuOpen
				? 'linear(0, 0.236 4.2%, 0.447 8.5%, 0.633 12.9%, 0.793 17.4%, 0.863 19.7%, 0.927 22%, 0.986 24.4%, 1.039 26.8%, 1.084 29.2%, 1.125 31.7%, 1.159 34.2%, 1.189 36.8%, 1.208 39%, 1.224 41.2%, 1.236 43.4%, 1.244 45.7%, 1.249 48.1%, 1.25 50.5%, 1.247 53%, 1.241 55.6%, 1.224 60.1%, 1.195 65.1%, 1.163 69.9%, 1.075 81.8%, 1.053 85.1%, 1.036 88.1%, 1.02 91.4%, 1.009 94.4%, 1.002 97.3%, 1)'
				: 'cubic-bezier(0.7, 0, 0.84, 0)'}

			<li>
				<a
					href={resolve(navLink.path)}
					onclick={() => handleLinkClick(index)}
					aria-current={isActive(navLink.path) ? 'page' : undefined}
					class={[
						'inline-block text-4xl font-bold tracking-tight hover:tracking-widest sm:text-6xl md:text-7xl',
						isActive(navLink.path) ? 'text-primary' : ''
					]}
					style="
						opacity: {isMenuOpen ? 1 : 0};
						transform: translateX({isMenuOpen ? '0px' : '100%'});
						transition: 
							transform {animDuration} {animTiming} {isMenuOpen ? enterDelay : exitDelay},
							opacity {animDuration} {animTiming} {isMenuOpen ? enterDelay : exitDelay},
							letter-spacing 300ms ease 0ms;
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
			transform 0.25s ease-in-out,
			top 0.25s ease-in-out,
			left 0.25s ease-in-out,
			opacity 0.25s ease-in-out;
	}

	.burger-icon:hover span {
		background: var(--color-primary);
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
