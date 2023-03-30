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

<style lang="scss" scoped>
  .scroll {
    display: flex;
    flex: 100%;
    flex-flow: row nowrap;
    overflow-x: hidden;
    overflow-y: hidden;
    scroll-behavior: smooth;
    transition-duration: 1s;

    > .grid {
      display: flex;
      flex-flow: row nowrap;
      gap: 8px;
      justify-content: space-evenly;
    }
    .scroll > * {
      flex: 0 0 auto;
    }
    .scroll:hover {
      overflow-x: auto;
    }
  }
</style>
