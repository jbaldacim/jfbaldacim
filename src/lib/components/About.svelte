<script>
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
    I'm João, a Systems Analysis and Development undergrad building a career in
    Software Engineering. I geek out over Front-End Development, Data
    Visualization, and Machine Learning — turning ideas into functional and
    beautiful solutions.
  </p>
</BentoCard>
