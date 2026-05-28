<script lang="ts" module>
  export type PixelMatrix = number[][];
</script>

<script lang="ts">
  import { onMount } from "svelte";

  // ─────────────────────────────────────────────────────────────────────────────
  // PROPS
  // ─────────────────────────────────────────────────────────────────────────────
  interface Props {
    matrix: PixelMatrix;
    width?: number | string;
    height?: number | string;
    colors?: string[];
    hoverColor?: string | null;
    repelRadius?: number;
    strength?: number;
    returnSpeed?: number;
    damping?: number;
    renderMode?: "canvas" | "svg" | "auto";
    autoThreshold?: number;
    resolution?: number;
    class?: string;
    style?: string;
  }

  let {
    matrix,
    width = 64,
    height = 64,
    colors = ["#3f3f3f", "#f3f3f3"],
    hoverColor = "#c91a1a",
    repelRadius = 18,
    strength = 5,
    returnSpeed = 0.08,
    damping = 0.8,
    renderMode = "auto",
    autoThreshold = 200,
    resolution = 1,
    class: className = "",
    style = "",
  }: Props = $props();

  // ─────────────────────────────────────────────────────────────────────────────
  // INTERNAL STATE
  // ─────────────────────────────────────────────────────────────────────────────

  // FIX 1: DOM Bindings must be $state in Svelte 5
  let containerEl: HTMLDivElement | undefined = $state();
  let canvasEl: HTMLCanvasElement | undefined = $state();
  let svgEl: SVGSVGElement | undefined = $state();

  let containerWidth = $state(0);
  let containerHeight = $state(0);

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

  const parseHex = (hex: string | null | undefined) => {
    if (!hex) return null;
    const h = hex.replace("#", "");
    if (h.length === 3) {
      return {
        r: parseInt(h[0] + h[0], 16),
        g: parseInt(h[1] + h[1], 16),
        b: parseInt(h[2] + h[2], 16),
      };
    }
    return {
      r: parseInt(h.slice(0, 2), 16),
      g: parseInt(h.slice(2, 4), 16),
      b: parseInt(h.slice(4, 6), 16),
    };
  };

  let parsedColors = $derived(colors.map(parseHex));
  let parsedHover = $derived(parseHex(hoverColor));

  // FIX 2: Compute Layout purely via $derived.by instead of mutating state in an $effect
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
            pArray[base + 0] = x; // x
            pArray[base + 1] = y; // y
            pArray[base + 2] = x; // homeX
            pArray[base + 3] = y; // homeY
            pArray[base + 4] = 0; // vx
            pArray[base + 5] = 0; // vy
            pArray[base + 6] = radius; // radius
            pArray[base + 7] = pixel; // colorIndex
            idx++;
          }
        }
      }
    }

    return { particlesArr: pArray, count: circleCount };
  });

  // Tap into the derived layout data
  let particles = $derived(layoutData.particlesArr);
  let numParticles = $derived(layoutData.count);

  // ─────────────────────────────────────────────────────────────────────────────
  // EFFECTS & LIFECYCLE
  // ─────────────────────────────────────────────────────────────────────────────

  // Safely scale canvas (Now triggers correctly because canvasEl is $state)
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
      }
    });

    if (containerEl) ro.observe(containerEl);
    rafId = requestAnimationFrame(tick);

    return () => {
      ro.disconnect();
      cancelAnimationFrame(rafId);
    };
  });

  // ─────────────────────────────────────────────────────────────────────────────
  // ANIMATION LOOP
  // ─────────────────────────────────────────────────────────────────────────────
  function tick() {
    if (numParticles === 0) {
      rafId = requestAnimationFrame(tick);
      return;
    }

    const targetProgress = mouseInside ? 1 : 0;
    progress += (targetProgress - progress) * 0.25;

    const currentColors = parsedColors.map((base, i) => {
      if (!base) return "#000";
      if (!parsedHover || progress < 0.01)
        return colors[i] || colors[1] || "#000";
      const r = Math.round(base.r + (parsedHover.r - base.r) * progress);
      const g = Math.round(base.g + (parsedHover.g - base.g) * progress);
      const b = Math.round(base.b + (parsedHover.b - base.b) * progress);
      return `rgb(${r},${g},${b})`;
    });

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

    // Mutating a typed array via reference bypasses Svelte's render engine entirely,
    // keeping our 60fps loop highly optimized.
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

      const fillColor = currentColors[colorIdx] || currentColors[1] || "#000";

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
          if (parsedHover && progress > 0.01) {
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
    if (!containerEl) return;
    const rect = containerEl.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
    mouseInside = true;
  }

  function onPointerLeave() {
    mouseInside = false;
  }
</script>

<div
  bind:this={containerEl}
  class={className}
  style:width={typeof width === "number" ? `${width}px` : width}
  style:height={typeof height === "number" ? `${height}px` : height}
  style:position="relative"
  style:overflow="hidden"
  style:touch-action="none"
  {style}
  onpointermove={onPointerMove}
  onpointerleave={onPointerLeave}
  role="img"
>
  {#if actualMode === "canvas"}
    <canvas
      bind:this={canvasEl}
      style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
    ></canvas>
  {:else}
    <svg
      bind:this={svgEl}
      viewBox="0 0 {containerWidth || 100} {containerHeight || 100}"
      style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
      preserveAspectRatio="xMidYMid meet"
    >
      {#each Array.from({ length: numParticles }) as _, i (i)}
        <circle
          cx={particles[i * STRIDE + 0]}
          cy={particles[i * STRIDE + 1]}
          r={particles[i * STRIDE + 6]}
          fill={colors[particles[i * STRIDE + 7]] || colors[1] || "#000"}
        />
      {/each}
    </svg>
  {/if}
</div>
