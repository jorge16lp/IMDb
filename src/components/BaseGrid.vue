<template>
    <div class="scroll">
      <section class="grid">
        <slot></slot>
      </section>
    </div>
</template>

<script>

  export default{
  }
</script>

<style scoped>
  .scroll {
    display: flex;
    flex: 100%;
    flex-flow: row nowrap;
    overflow-x: hidden;
    overflow-y: hidden;
    scroll-behavior: smooth;
    transition-duration: 1s;
  }

  .scroll:hover {
    overflow-x: auto;
  }

  .scroll > * {
    flex: 0 0 auto;
  }

  .grid{
    display: flex;
    flex-flow: row nowrap;
    gap: 8px;
    justify-content: space-evenly;
  }

  @media (max-width: 1144px) {
    .grid {
      grid-template-columns: repeat(auto-fill, 10rem);
    }
  }

  @media (max-width: 744px) {
    .grid {
      grid-row: 4;
      grid-column: span 3;
      grid-template-columns: repeat(auto-fill, 8rem);
    }
  }
</style>