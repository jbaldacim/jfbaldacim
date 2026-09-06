<script lang="ts">
  import Badge from "./Badge.svelte";

  let {
    tags,
    selected = $bindable([]),
  }: { tags: string[]; selected?: string[] } = $props();

  function toggleTag(tag: string) {
    selected = selected.includes(tag)
      ? selected.filter((t) => t !== tag)
      : [...selected, tag];
  }
</script>

<h2 class="text-lg text-right w-full border-b-foreground/10 border-b pb-1">
  Categories
</h2>
<div class="pt-1 flex flex-wrap gap-1 justify-end">
  {#each tags as tag (tag)}
    <Badge
      active={selected.includes(tag)}
      as="button"
      onclick={() => toggleTag(tag)}
      aria-pressed={selected.includes(tag)}>{tag}</Badge
    >
  {/each}
</div>
