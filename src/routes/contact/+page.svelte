<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();

	let isSubmitting = $state(false);
</script>

<svelte:head>
	<title>Contact · João Baldacim</title>
</svelte:head>

<div class="mx-auto w-full max-w-3xl flex-1 bg-background p-4 md:p-6">
	<h1 class="font-heading text-3xl font-semibold">Contact</h1>
	<div class="gap-4 pt-6 text-xl">
		<p>
			You can find me on
			<a
				href="https://linkedin.com/in/joãofleurybaldacim"
				rel="noreferrer noopener external"
				target="_blank"
				class="text-primary hover:underline"
			>
				LinkedIn
			</a>,
			<a
				href="https://github.com/jbaldacim"
				rel="noreferrer noopener external"
				target="_blank"
				class="text-primary hover:underline"
			>
				GitHub
			</a>, or reach out through the forms below!
		</p>
		{#if form?.success}
			<div class="mt-10 border border-primary/30 bg-primary/10 p-4 text-primary">
				<p>Thanks for the message! I'll follow up soon!</p>
			</div>
		{:else}
			<form
				method="POST"
				use:enhance={() => {
					isSubmitting = true;
					return async ({ update }) => {
						await update();
						isSubmitting = false;
					};
				}}
				class="flex flex-col gap-4"
			>
				{#if form?.error}
					<div class="mt-6 border border-destructive/30 bg-destructive/15 p-3 text-destructive">
						<p>{form.error}</p>
					</div>
				{/if}

				<div class="flex flex-col gap-1 pt-6">
					<label for="name" class="font-medium">Name</label>
					<input
						id="name"
						name="name"
						required
						value={form?.values?.name ?? ''}
						type="text"
						class="border border-foreground/15 bg-background px-3 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
					/>
				</div>

				<div class="flex flex-col gap-1">
					<label for="email" class="font-medium">Email</label>
					<input
						id="email"
						name="email"
						required
						value={form?.values?.email ?? ''}
						type="email"
						class="border border-foreground/15 bg-background px-3 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
					/>
				</div>

				<div class="flex flex-col gap-1">
					<label for="message" class="font-medium">Message</label>
					<textarea
						id="message"
						name="message"
						required
						rows="5"
						value={form?.values?.message ?? ''}
						class="resize-y border border-foreground/15 bg-background px-3 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
					></textarea>
				</div>

				<div aria-hidden="true" style="display: none; position: absolute; left: -9999px;">
					<label for="website">Don't fill this if you're a human!</label>
					<input id="website" name="website" type="text" tabindex="-1" autocomplete="off" />
				</div>

				<button
					type="submit"
					disabled={isSubmitting}
					class="mt-2 cursor-pointer bg-primary px-4 py-2 font-medium text-primary-foreground transition-colors hover:bg-primary/75 disabled:cursor-not-allowed disabled:opacity-50"
					>{isSubmitting ? 'Sending' : 'Send'}</button
				>
			</form>
		{/if}
	</div>
</div>
