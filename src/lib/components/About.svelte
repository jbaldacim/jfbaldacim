<script lang="ts">
  import BentoCard from "./BentoCard.svelte";

  let { class: className = "" } = $props();
</script>

<BentoCard
  title="Hey, there!"
  class={className}
  largeX={-200}
  largeDuration={750}
  largeDelay={500}
  smallX={200}
  smallDuration={750}
  smallDelay={500}
>
  <p>
    I'm João, a Full-Stack Developer building a career in Software Engineering.
    I geek out over Front-End Development, Data Visualization, and Machine
    Learning — turning ideas into functional and beautiful solutions.
  </p>
  <p>
    Currently I'm a Systems Analysis and Development undergraduate student at
    IFSP - Campus Boituva and I'm open to new opportunities for trainee and
    junior positions.
  </p>
</BentoCard>
