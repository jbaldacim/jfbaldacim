<script lang="ts" module>
  export type PixelMatrix = number[][];

  // Singleton 1x1 canvas to natively parse ANY color format (oklch, hsl, p3) into RGB.
  let colorParserCtx: CanvasRenderingContext2D | null = null;

  function getRgbFromCss(cssColor: string) {
    if (typeof document === "undefined") return { r: 0, g: 0, b: 0 };
    if (!colorParserCtx) {
      const canvas = document.createElement("canvas");
      canvas.width = 1;
      canvas.height = 1;
      colorParserCtx = canvas.getContext("2d", { willReadFrequently: true });
    }

    if (!colorParserCtx) return { r: 0, g: 0, b: 0 };

    colorParserCtx.clearRect(0, 0, 1, 1);
    colorParserCtx.fillStyle = cssColor;
    colorParserCtx.fillRect(0, 0, 1, 1);
    const data = colorParserCtx.getImageData(0, 0, 1, 1).data;

    return { r: data[0], g: data[1], b: data[2] };
  }

  // Parses Hex strings into RGBA to support opacity interpolation
  function parseColorToRgba(css: string | undefined) {
    if (!css || css === "transparent" || css === "currentColor") return null;
    const h = css.replace("#", "");
    if (h.length === 3)
      return {
        r: parseInt(h[0] + h[0], 16),
        g: parseInt(h[1] + h[1], 16),
        b: parseInt(h[2] + h[2], 16),
        a: 1,
      };
    if (h.length === 4)
      return {
        r: parseInt(h[0] + h[0], 16),
        g: parseInt(h[1] + h[1], 16),
        b: parseInt(h[2] + h[2], 16),
        a: parseInt(h[3] + h[3], 16) / 255,
      };
    if (h.length === 6)
      return {
        r: parseInt(h.slice(0, 2), 16),
        g: parseInt(h.slice(2, 4), 16),
        b: parseInt(h.slice(4, 6), 16),
        a: 1,
      };
    if (h.length === 8)
      return {
        r: parseInt(h.slice(0, 2), 16),
        g: parseInt(h.slice(2, 4), 16),
        b: parseInt(h.slice(4, 6), 16),
        a: parseInt(h.slice(6, 8), 16) / 255,
      };
    return null;
  }
</script>

<script lang="ts">
  import { cn } from "$lib/utils";
  import { onMount } from "svelte";

  // ─────────────────────────────────────────────────────────────────────────────
  // PROPS
  // ─────────────────────────────────────────────────────────────────────────────
  interface Props {
    matrix: PixelMatrix;
    width?: number | string;
    height?: number | string;
    /** Brand colors for HOVER state. Maps sequentially to matrix values 1, 2... */
    colors?: string[];
    /** Rest colors for IDLE state. If omitted, defaults to "currentColor" */
    idleColors?: string[];
    repelRadius?: number;
    strength?: number;
    returnSpeed?: number;
    damping?: number;
    renderMode?: "canvas" | "svg" | "auto";
    autoThreshold?: number;
    resolution?: number;
    class?: string;
    style?: string;
    title?: string;
  }

  let {
    matrix,
    width = 48,
    height = 48,
    colors = ["#000000"],
    idleColors = [], // Fallback applied in loop
    repelRadius = 18,
    strength = 5,
    returnSpeed = 0.08,
    damping = 0.8,
    renderMode = "auto",
    autoThreshold = 200,
    resolution = 1,
    class: className = "",
    style = "",
    title = "",
  }: Props = $props();

  // ─────────────────────────────────────────────────────────────────────────────
  // INTERNAL STATE
  // ─────────────────────────────────────────────────────────────────────────────
  let containerEl: HTMLDivElement | undefined = $state();
  let canvasEl: HTMLCanvasElement | undefined = $state();
  let svgEl: SVGSVGElement | undefined = $state();

  let containerWidth = $state(0);
  let containerHeight = $state(0);

  let baseColorStr = $state("currentColor");
  let baseColorRGB = $state({ r: 0, g: 0, b: 0 });
  let isReady = $state(false);

  const STRIDE = 8;
  let mouseX = -9999;
  let mouseY = -9999;
  let mouseInside = false;
  let progress = 0;
  let rafId: number;
  let svgCircles: NodeListOf<SVGCircleElement> | null = null;

  // ─────────────────────────────────────────────────────────────────────────────
  // DERIVATIONS
  // ─────────────────────────────────────────────────────────────────────────────
  let res = $derived(Math.max(1, Math.min(resolution, 8)));

  let circleCount = $derived.by(() => {
    let count = 0;
    for (let y = 0; y < matrix.length; y++) {
      for (let x = 0; x < matrix[y].length; x++) {
        if (matrix[y][x] > 0) count++;
      }
    }
    return count * res * res;
  });

  let actualMode = $derived(
    renderMode !== "auto"
      ? renderMode
      : circleCount > autoThreshold
        ? "canvas"
        : "svg",
  );

  let layoutData = $derived.by(() => {
    if (!matrix.length || containerWidth === 0 || containerHeight === 0) {
      return { particlesArr: new Float32Array(0), count: 0 };
    }

    const rows = matrix.length;
    const cols = matrix[0]?.length || 0;
    if (cols === 0) return { particlesArr: new Float32Array(0), count: 0 };

    const W = containerWidth;
    const H = containerHeight;
    const cellSize = (Math.min(W, H) / Math.max(rows, cols)) * 0.88;
    const gridW = cols * cellSize;
    const gridH = rows * cellSize;
    const offsetX = (W - gridW) / 2;
    const offsetY = (H - gridH) / 2;
    const subCellSize = cellSize / res;
    const radius = subCellSize * 0.46;

    const pArray = new Float32Array(circleCount * STRIDE);

    let idx = 0;
    for (let yi = 0; yi < rows; yi++) {
      for (let xi = 0; xi < cols; xi++) {
        const pixel = matrix[yi][xi];
        if (pixel === 0) continue;

        for (let sy = 0; sy < res; sy++) {
          for (let sx = 0; sx < res; sx++) {
            const x =
              offsetX + xi * cellSize + sx * subCellSize + subCellSize / 2;
            const y =
              offsetY + yi * cellSize + sy * subCellSize + subCellSize / 2;

            const base = idx * STRIDE;
            pArray[base + 0] = x;
            pArray[base + 1] = y;
            pArray[base + 2] = x;
            pArray[base + 3] = y;
            pArray[base + 4] = 0;
            pArray[base + 5] = 0;
            pArray[base + 6] = radius;
            pArray[base + 7] = pixel;
            idx++;
          }
        }
      }
    }

    return { particlesArr: pArray, count: circleCount };
  });

  let particles = $derived(layoutData.particlesArr);
  let numParticles = $derived(layoutData.count);

  // ─────────────────────────────────────────────────────────────────────────────
  // EFFECTS & LIFECYCLE
  // ─────────────────────────────────────────────────────────────────────────────

  function updateComputedColor() {
    if (!containerEl) return;
    const compColor = window.getComputedStyle(containerEl).color;

    if (compColor !== baseColorStr) {
      baseColorStr = compColor;
      baseColorRGB = getRgbFromCss(compColor);
      isReady = true;
    }
  }

  $effect(() => {
    if (
      actualMode === "canvas" &&
      canvasEl &&
      containerWidth &&
      containerHeight
    ) {
      const dpr = window.devicePixelRatio || 1;
      canvasEl.width = containerWidth * dpr;
      canvasEl.height = containerHeight * dpr;
      const ctx = canvasEl.getContext("2d");
      if (ctx) ctx.scale(dpr, dpr);
    }
  });

  onMount(() => {
    const ro = new ResizeObserver(() => {
      if (containerEl) {
        const rect = containerEl.getBoundingClientRect();
        containerWidth = rect.width;
        containerHeight = rect.height;
        updateComputedColor();
      }
    });
    if (containerEl) ro.observe(containerEl);

    const themeObserver = new MutationObserver(() => updateComputedColor());
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme"],
    });

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemThemeChange = () => updateComputedColor();
    mediaQuery.addEventListener("change", handleSystemThemeChange);

    rafId = requestAnimationFrame(tick);

    return () => {
      ro.disconnect();
      themeObserver.disconnect();
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
      cancelAnimationFrame(rafId);
    };
  });

  // ─────────────────────────────────────────────────────────────────────────────
  // ANIMATION LOOP
  // ─────────────────────────────────────────────────────────────────────────────
  function tick() {
    if (numParticles === 0 || !isReady) {
      rafId = requestAnimationFrame(tick);
      return;
    }

    const targetProgress = mouseInside ? 1 : 0;
    progress += (targetProgress - progress) * 0.25;

    let ctx: CanvasRenderingContext2D | null = null;
    if (actualMode === "canvas" && canvasEl) {
      ctx = canvasEl.getContext("2d");
      if (ctx) ctx.clearRect(0, 0, containerWidth, containerHeight);
    }

    if (actualMode === "svg") {
      if (!svgCircles || svgCircles.length !== numParticles) {
        svgCircles = svgEl?.querySelectorAll("circle") || null;
      }
    }

    const repelRadiusSq = repelRadius * repelRadius;

    // Advanced RGBA Interpolation Engine
    const currentColors = colors.map((hoverStr, i) => {
      const idleStr = idleColors[i] || "currentColor";

      // Return pure CSS strings at the extremes for absolute performance and theme-syncing
      if (progress < 0.01) {
        if (idleStr === "transparent") return "transparent";
        if (idleStr === "currentColor") return baseColorStr;
        return idleStr;
      }
      if (progress > 0.99) return hoverStr;

      // Extract Target (Hover) RGBA
      let tR = 0,
        tG = 0,
        tB = 0,
        tA = 1;
      const tParsed = parseColorToRgba(hoverStr);
      if (tParsed) {
        tR = tParsed.r;
        tG = tParsed.g;
        tB = tParsed.b;
        tA = tParsed.a;
      }

      // Extract Start (Idle) RGBA
      let sR = baseColorRGB.r,
        sG = baseColorRGB.g,
        sB = baseColorRGB.b,
        sA = 1;
      if (idleStr === "transparent") {
        // Crucial trick: Steal the target's RGB to prevent fading through muddy gray/black
        sR = tR;
        sG = tG;
        sB = tB;
        sA = 0;
      } else if (idleStr !== "currentColor") {
        const sParsed = parseColorToRgba(idleStr);
        if (sParsed) {
          sR = sParsed.r;
          sG = sParsed.g;
          sB = sParsed.b;
          sA = sParsed.a;
        }
      }

      // Mathematical Lerp
      const r = Math.round(sR + (tR - sR) * progress);
      const g = Math.round(sG + (tG - sG) * progress);
      const b = Math.round(sB + (tB - sB) * progress);
      const a = sA + (tA - sA) * progress;

      return `rgba(${r},${g},${b},${a.toFixed(3)})`;
    });

    for (let i = 0; i < numParticles; i++) {
      const pIdx = i * STRIDE;
      let x = particles[pIdx + 0];
      let y = particles[pIdx + 1];
      const homeX = particles[pIdx + 2];
      const homeY = particles[pIdx + 3];
      let vx = particles[pIdx + 4];
      let vy = particles[pIdx + 5];
      const radius = particles[pIdx + 6];
      const colorIdx = particles[pIdx + 7];

      const dx = x - mouseX;
      const dy = y - mouseY;
      const distSq = dx * dx + dy * dy;

      if (mouseInside && distSq < repelRadiusSq && distSq > 0) {
        const dist = Math.sqrt(distSq);
        const force = (repelRadius - dist) / repelRadius;
        const factor = (force * strength) / dist;
        vx += dx * factor;
        vy += dy * factor;
      }

      vx += (homeX - x) * returnSpeed;
      vy += (homeY - y) * returnSpeed;
      vx *= damping;
      vy *= damping;

      x += vx;
      y += vy;

      particles[pIdx + 0] = x;
      particles[pIdx + 1] = y;
      particles[pIdx + 4] = vx;
      particles[pIdx + 5] = vy;

      const fillColor = currentColors[colorIdx - 1] || baseColorStr;

      if (actualMode === "canvas" && ctx) {
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = fillColor;
        ctx.fill();
      } else if (actualMode === "svg" && svgCircles) {
        const el = svgCircles[i];
        if (el) {
          el.setAttribute("cx", String(x));
          el.setAttribute("cy", String(y));
          if (el.getAttribute("fill") !== fillColor) {
            el.setAttribute("fill", fillColor);
          }
        }
      }
    }

    rafId = requestAnimationFrame(tick);
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // EVENT HANDLERS
  // ─────────────────────────────────────────────────────────────────────────────
  function onPointerMove(e: PointerEvent) {
    if (!containerEl || !isReady) return;

    updateComputedColor();

    const rect = containerEl.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
    mouseInside = true;
  }

  function onPointerLeave() {
    mouseInside = false;
  }
</script>

<div class={cn("flex flex-col items-center gap-2", className)} {style}>
  <div
    bind:this={containerEl}
    class="relative overflow-hidden touch-none"
    style:width={typeof width === "number" ? `${width}px` : width}
    style:height={typeof height === "number" ? `${height}px` : height}
    onpointermove={onPointerMove}
    onpointerleave={onPointerLeave}
    role="img"
    aria-label={title || "Interactive grid icon"}
  >
    {#if actualMode === "canvas"}
      <canvas bind:this={canvasEl} class="absolute inset-0 h-full w-full"
      ></canvas>
    {:else}
      <svg
        bind:this={svgEl}
        viewBox="0 0 {containerWidth || 100} {containerHeight || 100}"
        class="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {#each Array.from({ length: numParticles }) as _, i (i)}
          <circle
            cx={particles[i * STRIDE + 0]}
            cy={particles[i * STRIDE + 1]}
            r={particles[i * STRIDE + 6]}
            fill="currentColor"
          />
        {/each}
      </svg>
    {/if}
  </div>

  {#if title}
    <span class="text-xs font-light text-center tracking-wider">
      {title}
    </span>
  {/if}
</div>
