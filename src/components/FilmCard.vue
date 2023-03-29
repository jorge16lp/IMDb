<template>
  <article class="film">
    <div>film cover</div>
    <div>film name</div>
    <div>description on tooltip</div>
  </article>
</template>

<script>
  export default {
  };
</script>

<style scoped>
  div {
    text-align: center;
  }

  .film {
    border: 2px solid mediumpurple;
    border-radius: 10px;
    margin: 15px 10px 20px;
    display: grid;
    grid-template: 2fr 1fr 1fr / 1fr;
    align-items: center;
    width: 12rem;
    min-width: 10rem;
    min-height: 20rem;
  }
</style>