import { mdsvex } from "mdsvex";
import adapter from "@sveltejs/adapter-static";
import { createHighlighter } from "shiki";
import { escapeSvelte } from "mdsvex";
import { transformerMetaHighlight } from "@shikijs/transformers";
import { transformerNotationHighlight } from "@shikijs/transformers";

let highlighter = null;

/** @type {import('@sveltejs/kit').Config} */
const config = {
  compilerOptions: {
    // Force runes mode for the project, except for libraries. Can be removed in svelte 6.
    runes: ({ filename }) =>
      filename.split(/[/\\]/).includes("node_modules") ? undefined : true,
  },
  kit: {
    adapter: adapter({
      pages: "build",
      assets: "build",
      fallback: undefined,
      precompress: false,
      strict: true,
    }),
  },
  preprocess: [
    mdsvex({
      extensions: [".svx", ".md"],
      highlight: {
        highlighter: async (code, lang, meta) => {
          if (!highlighter) {
            highlighter = await createHighlighter({
              themes: ["one-dark-pro"],
              langs: [
                "javascript",
                "typescript",
                "svelte",
                "markdown",
                "yaml",
                "css",
                "json",
                "python",
                "jsx",
              ],
            });
          }

          const rawHtml = highlighter.codeToHtml(code, {
            lang: lang,
            theme: "one-dark-pro",
            meta: { __raw: meta },
            transformers: [
              transformerMetaHighlight(),
              transformerNotationHighlight(),
            ],
          });

          const filenameMatch = meta?.match(/filename="([^"]+)"/);
          const filename = filenameMatch ? filenameMatch[1] : "";

          const codeBase64 = Buffer.from(code).toString("base64");

          // Cabeçalho gerado já no build-time / SSR
          const headerHtml = `
            <div class="code-header">
              <span class="code-filename">${filename}</span>
              <button class="copy-btn" type="button" data-code="${codeBase64}">Copy</button>
            </div>
          `;

          const wrappedHtml = `
            <div class="code-block-wrapper">
              ${headerHtml}
              ${rawHtml}
            </div>
          `;

          const html = escapeSvelte(wrappedHtml);

          return html;
        },
      },
    }),
  ],
  extensions: [".svelte", ".svx", ".md"],
};

export default config;
