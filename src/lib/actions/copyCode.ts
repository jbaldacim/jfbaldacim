// src/lib/actions/copyCode.ts
export function copyCode(node: HTMLElement) {
  const handleClick = async (e: MouseEvent) => {
    const target = (e.target as HTMLElement).closest<HTMLButtonElement>(
      ".copy-btn",
    );
    if (!target) return;

    const base64Code = target.dataset.code;
    if (!base64Code) return;

    try {
      const code = atob(base64Code);
      await navigator.clipboard.writeText(code);
      target.textContent = "Copied!";
      target.classList.add("copied");
      setTimeout(() => {
        target.textContent = "Copy";
        target.classList.remove("copied");
      }, 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  node.addEventListener("click", handleClick);

  return {
    destroy() {
      node.removeEventListener("click", handleClick);
    },
  };
}
