<script lang="ts">
  import { enhance } from "$app/forms";
  import type { ActionData } from "./$types";

  let { form }: { form: ActionData } = $props();

  let isSubmitting = $state(false);
</script>

<svelte:head>
  <title>Contact · João Baldacim</title>
</svelte:head>

<div class="flex-1 max-w-3xl bg-background mx-auto p-4 md:p-6 w-full">
  <h1 class="text-3xl font-semibold font-heading">Contact</h1>
  <div class="pt-6 gap-4">
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
      <div
        class="p-4 bg-primary/10 text-primary border border-primary/30 mt-10"
      >
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
          <div
            class="mt-6 p-3 text-sm bg-destructive/15 text-destructive border border-destructive/30"
          >
            <p>{form.error}</p>
          </div>
        {/if}

        <div class="flex flex-col gap-1 pt-6">
          <label for="name" class="text-sm font-medium">Name</label>
          <input
            id="name"
            name="name"
            required
            value={form?.values?.name ?? ""}
            type="text"
            class="px-3 py-2 border border-foreground/15 bg-background focus:outline-none focus:ring-2 focus:ring-primary text-sm"
          />
        </div>

        <div class="flex flex-col gap-1">
          <label for="email" class="text-sm font-medium">Email</label>
          <input
            id="email"
            name="email"
            required
            value={form?.values?.email ?? ""}
            type="email"
            class="px-3 py-2 border border-foreground/15 bg-background focus:outline-none focus:ring-2 focus:ring-primary text-sm"
          />
        </div>

        <div class="flex flex-col gap-1">
          <label for="message" class="text-sm font-medium">Message</label>
          <textarea
            id="message"
            name="message"
            required
            rows="5"
            value={form?.values?.message ?? ""}
            class="px-3 py-2 border border-foreground/15 bg-background focus:outline-none focus:ring-2 focus:ring-primary text-sm resize-y"
          ></textarea>
        </div>

        <div
          aria-hidden="true"
          style="display: none; position: absolute; left: -9999px;"
        >
          <label for="website">Don't fill this if you're a human!</label>
          <input
            id="website"
            name="website"
            type="text"
            tabindex="-1"
            autocomplete="off"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          class="mt-2 px-4 py-2 bg-primary text-primary-foreground font-medium hover:bg-primary/75 transition-colors disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed text-sm"
          >{isSubmitting ? "Sending" : "Send"}</button
        >
      </form>
    {/if}
  </div>
</div>
