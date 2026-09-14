<script>
	import RepulsionGrid from '$lib/components/RepulsionGrid.svelte';
	import {
		d3Icon,
		expressIcon,
		nextJsIcon,
		nodeIcon,
		pythonIcon,
		reactIcon,
		svelteIcon,
		tailwindCssIcon,
		typescriptIcon,
		viteIcon
	} from '$lib/icons';
</script>

<section class="flex w-full items-center justify-center">
	<div
		class="w-full max-w-7xl p-8 [&_p]:max-w-[65ch] [&_p]:leading-normal [&_p]:font-light [&_p:not(:last-child)]:pb-6"
	>
		<h2 class="pb-6 font-heading text-3xl font-semibold">Stack</h2>

		<div class="pb-12">
			<h3 class="pb-4 text-sm font-semibold tracking-wider text-neutral-400 uppercase">
				Apps & UI Frameworks
			</h3>
			<div class="grid w-full grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-4">
				<RepulsionGrid
					matrix={nextJsIcon}
					colors={['#000000', '#FFFFFF', '#FFFFFF']}
					idleColors={['currentColor', 'transparent', 'currentColor']}
					renderMode="canvas"
					repelRadius={12}
					strength={2}
					returnSpeed={0.15}
					title="Next.js"
					width={96}
					height={96}
				/>
				<RepulsionGrid
					matrix={reactIcon}
					colors={['#61DAFB']}
					renderMode="canvas"
					repelRadius={12}
					strength={2}
					returnSpeed={0.15}
					title="React"
					width={96}
					height={96}
				/>
				<RepulsionGrid
					matrix={svelteIcon}
					colors={['#FF3E00', '#FFF']}
					idleColors={['currentColor', 'transparent']}
					renderMode="canvas"
					repelRadius={12}
					strength={2}
					returnSpeed={0.15}
					title="Svelte"
					width={96}
					height={96}
				/>
				<RepulsionGrid
					matrix={tailwindCssIcon}
					colors={['#06B6D4']}
					renderMode="canvas"
					repelRadius={12}
					strength={2}
					returnSpeed={0.15}
					title="Tailwind"
					width={96}
					height={96}
				/>
			</div>
		</div>

		<div class="pb-12">
			<h3 class="pb-4 text-sm font-semibold tracking-wider text-neutral-400 uppercase">
				Languages & Tooling
			</h3>
			<div class="grid w-full grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-4">
				<RepulsionGrid
					matrix={typescriptIcon}
					colors={['#3178C6', '#FFFFFF']}
					idleColors={['currentColor', 'transparent']}
					renderMode="canvas"
					repelRadius={12}
					strength={2}
					returnSpeed={0.15}
					title="TypeScript"
					width={96}
					height={96}
				/>
				<RepulsionGrid
					matrix={nodeIcon}
					colors={['#5FA04E']}
					renderMode="canvas"
					repelRadius={12}
					strength={2}
					returnSpeed={0.15}
					title="Node.js"
					width={96}
					height={96}
				/>
				<RepulsionGrid
					matrix={expressIcon}
					colors={['#FFFFFF']}
					idleColors={['currentColor']}
					renderMode="canvas"
					repelRadius={12}
					strength={2}
					returnSpeed={0.15}
					title="Express"
					width={96}
					height={96}
				/>
				<RepulsionGrid
					matrix={viteIcon}
					colors={['#9135FF']}
					renderMode="canvas"
					repelRadius={12}
					strength={2}
					returnSpeed={0.15}
					title="Vite"
					width={96}
					height={96}
				/>
			</div>
		</div>

		<div>
			<h3 class="pb-4 text-sm font-semibold tracking-wider text-neutral-400 uppercase">
				Data & Analytics
			</h3>
			<div class="grid w-full grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-4">
				<RepulsionGrid
					matrix={pythonIcon}
					colors={['#306998', '#FFD43B']}
					renderMode="canvas"
					repelRadius={12}
					strength={2}
					returnSpeed={0.15}
					title="Python"
					width={96}
					height={96}
				/>
				<RepulsionGrid
					matrix={d3Icon}
					colors={['#F9A03C']}
					renderMode="canvas"
					repelRadius={12}
					strength={2}
					returnSpeed={0.15}
					title="D3"
					width={96}
					height={96}
				/>
			</div>
		</div>
	</div>
</section>
