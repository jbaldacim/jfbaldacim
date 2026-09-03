<script>
  import { onMount } from "svelte";
  import * as d3 from "d3";

  let svgEl = $state();
  let sectionEl = $state();
  let visible = $state(false);

  onMount(() => {
    const W = sectionEl.offsetWidth;
    const H = sectionEl.offsetHeight;

    const svg = d3
      .select(svgEl)
      .attr("viewBox", `0 0 ${W} ${H}`)
      .attr("preserveAspectRatio", "xMidYMid slice");

    const rng = d3.randomUniform.source(d3.randomLcg(42))(0, 1);
    const points = Array.from({ length: 300 }, () => [rng() * W, rng() * H]);

    const yRank = new Array(points.length);
    [...points.map((p, i) => ({ i, y: p[1] }))]
      .sort((a, b) => a.y - b.y)
      .forEach((d, rank) => {
        yRank[d.i] = rank;
      });

    const delaunay = d3.Delaunay.from(points);
    const voronoi = delaunay.voronoi([0, 0, W, H]);

    const cellGroup = svg.append("g");
    const dotGroup = svg.append("g");

    const cells = cellGroup
      .selectAll("path")
      .data(points)
      .join("path")
      .attr("class", "v-cell")
      .attr("d", (_, i) => voronoi.renderCell(i))
      .style("transform-box", "view-box")
      .style("transform-origin", (d) => `${d[0]}px ${d[1]}px`)
      .style("transform", "scale(0)")
      .style("opacity", 0);

    const perCell = 5,
      dur = 800;
    const totalAnim = (points.length - 1) * perCell + dur;

    cells
      .transition()
      .delay((_, i) => yRank[i] * perCell)
      .duration(dur)
      .ease(d3.easeCubicOut)
      .style("transform", "scale(1)")
      .style("opacity", 1);

    const dots = dotGroup
      .selectAll("circle")
      .data(points)
      .join("circle")
      .attr("class", "v-point")
      .attr("cx", (d) => d[0])
      .attr("cy", (d) => d[1])
      .attr("r", 1)
      .style("opacity", 0);

    dots
      .transition()
      .delay((_, i) => yRank[i] * perCell + 250)
      .duration(500)
      .style("opacity", 1);

    setTimeout(() => {
      cells
        .style("transform-box", null)
        .style("transform-origin", null)
        .style("transform", null)
        .style("opacity", null);

      visible = true;
    }, totalAnim + 50);

    cells
      .on("mouseenter", (_, d) => {
        const i = points.indexOf(d);
        dots
          .filter((_, j) => j === i)
          .style("opacity", 0)
          .style("transition-delay", "0ms");
      })
      .on("mouseleave", (_, d) => {
        const i = points.indexOf(d);
        dots
          .filter((_, j) => j === i)
          .style("opacity", 1)
          .style("transition-delay", "700ms");
      });

    svg.classed("gradient", true);
  });
</script>

<section
  bind:this={sectionEl}
  class="relative h-[calc(100vh-64px)] flex items-center justify-center bg-background"
>
  <svg bind:this={svgEl} class="absolute inset-0 w-full h-full"></svg>

  <div
    class="relative z-10 max-w-7xl w-full p-8 pointer-events-none transition-opacity duration-700 {visible
      ? 'opacity-100'
      : 'opacity-0'}"
  >
    <div class="w-fit p-8 bg-muted/60 rounded-lg">
      <span class="text-sm tracking-tight">Hey, there! I'm</span>
      <h1 class="tracking-wider font-bold uppercase text-4xl md:text-7xl mt-8">
        João<br />Baldacim
      </h1>
      <p class="mt-6 leading-relaxed max-w-xl font-light">
        Full-Stack Developer building a career in Software Engineering. I geek
        out over Front-End Development, Data Visualization, and Machine Learning
        — turning ideas into functional and beautiful solutions.
      </p>
    </div>
  </div>
</section>

<style>
  :global(.v-cell) {
    fill: oklch(18.389% 0.00518 219.937);
    stroke: oklch(18.389% 0.00518 219.937);
    stroke-width: 1px;
    transition: fill 300ms;
    transition-delay: 700ms;
  }

  :global(.v-cell:hover) {
    fill: transparent;
    stroke: transparent;
    transition:
      fill 0ms,
      stroke 0ms;
    transition-delay: 0ms;
  }

  :global(.v-point) {
    fill: hsl(0deg 0% 65%);
    pointer-events: none;
    transition: opacity 300ms;
    transition-delay: 700ms;
  }
</style>
