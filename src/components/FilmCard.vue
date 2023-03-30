<template>
  <article class="film">
    <img src="/cover_.jpeg" class="film_image" alt="film image">
    <div>🍿film name🍿</div>
    <div>✨description on tooltip✨</div>
  </article>
</template>

<script>
  export default {
  };
</script>

<style lang="scss" scoped>
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

    .film_image {
      width: 150px;
      margin-top: 5px;
      border-radius: 3px;
      justify-self: center;
    }

    div {
      text-align: center;
    }
  }
</style>