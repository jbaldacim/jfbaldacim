<script lang="ts">
	interface Props {
		currentPage: number;
		totalPages: number;
	}

	let { currentPage = $bindable(1), totalPages }: Props = $props();

	const buttonClasses =
		'inline-flex items-center text-xs px-2.5 py-1 ring-1 transition-all duration-300 select-none cursor-pointer ring-foreground/10 text-muted-foreground hover:ring-primary hover:text-foreground disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:ring-foreground/10 disabled:hover:text-muted-foreground';
</script>

{#if totalPages > 1}
	<nav
		aria-label="Blog posts listing pagination"
		class="flex items-center justify-between border-t border-foreground/10 pt-6 text-xs text-muted-foreground"
	>
		<button
			type="button"
			onclick={() => (currentPage = Math.max(1, currentPage - 1))}
			disabled={currentPage === 1}
			class={buttonClasses}
		>
			Previous
		</button>

		<span class="inline-flex items-center gap-1 font-mono tracking-wider">
			Page {currentPage} of {totalPages}
		</span>

		<button
			type="button"
			onclick={() => (currentPage = Math.min(totalPages, currentPage + 1))}
			disabled={currentPage === totalPages}
			class={buttonClasses}
		>
			Next
		</button>
	</nav>
{/if}
