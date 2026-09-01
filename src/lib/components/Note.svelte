<script lang="ts">
  import type { Snippet } from "svelte";

  type NoteType = "info" | "tip" | "warning" | "danger" | "note" | "success";

  type Props = {
    type?: NoteType;
    title?: string;
    children?: Snippet;
  };

  let { type = "info", title, children }: Props = $props();

  const config: Record<
    NoteType,
    {
      label: string;
      icon: string;
      classes: string;
    }
  > = {
    info: {
      label: "Info",
      icon: "ⓘ",
      classes:
        "border-blue-500/30 bg-blue-500/5 text-blue-700 dark:text-blue-300",
    },
    tip: {
      label: "Tip",
      icon: "✦",
      classes:
        "border-emerald-500/30 bg-emerald-500/5 text-emerald-700 dark:text-emerald-300",
    },
    warning: {
      label: "Warning",
      icon: "⚠",
      classes:
        "border-amber-500/30 bg-amber-500/5 text-amber-700 dark:text-amber-300",
    },
    danger: {
      label: "Danger",
      icon: "!",
      classes: "border-red-500/30 bg-red-500/5 text-red-700 dark:text-red-300",
    },
    note: {
      label: "Note",
      icon: "◆",
      classes:
        "border-zinc-500/30 bg-zinc-500/5 text-zinc-700 dark:text-zinc-300",
    },
    success: {
      label: "Success",
      icon: "✓",
      classes:
        "border-green-500/30 bg-green-500/5 text-green-700 dark:text-green-300",
    },
  };

  const variant = $derived(config[type]);
</script>

<aside
  class={`my-8 border-l-4 px-5 py-4 ${variant.classes}`}
  role={type === "danger" || type === "warning" ? "alert" : "note"}
>
  <div class="flex items-center gap-2 font-semibold">
    <span
      class="flex size-5 shrink-0 items-center justify-center text-sm"
      aria-hidden="true"
    >
      {variant.icon}
    </span>

    <span>{title ?? variant.label}</span>
  </div>

  <div class="mt-2 text-sm leading-6 text-zinc-700 dark:text-zinc-300">
    {@render children?.()}
  </div>
</aside>
