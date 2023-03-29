<template>
  <div class="sliding">
    <button class="movement_button" @click="moveLeft"> ← </button>
    <div class="scroll">
      <section class="grid">
        <slot></slot>
      </section>
    </div>
    <button class="movement_button" @click="moveRight"> → </button>
  </div>
</template>

<script>

  export default{
    methods: {
      moveRight() {
        document.querySelector('.scroll').scrollLeft += 224;
      },
      moveLeft() {
        document.querySelector('.scroll').scrollLeft -= 224;
      }
    }
  }
</script>

<style scoped>
  .sliding{
    align-items: center;
    display: flex;
    flex-flow: row nowrap;
    position: relative;
  }

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

  .movement_button {
    border: 1px solid mediumpurple;
    background-color: black;
    color: white;
    border-radius: 3px;
    margin: 5px;
  }

  .movement_button:hover {
    background-color: mediumpurple;
  }

  @keyframes blink {
    from { opacity: 1; }
    to { opacity: 0; }
  }

  .movement_button:active {
    animation: blink 0.5s;
  }

  .grid{
    /*border: 2px solid mediumpurple;*/
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