<template>
  <label for="search">
    <input id="search" type="text" class="search" placeholder="Search..." @input="setQuery($event.target.value)"/>
  </label>
</template>

<script >
  export default  {
    methods: {
      setQuery(query) {
        this.$store.commit('search/setQuery', query);
        this.$store.dispatch('characters/fetchCharacters');
      }
    }
  }
</script>

<style scoped>
  @keyframes onClickBorderRadius {
    from { border-radius: 0; }
    to { border-radius: 20px; }
  }

  @keyframes onClickBorderRadiusOut {
    from { border-radius: 20px; }
    to { border-radius: 0; }
  }

  .search {
    width: 100%;
    height: 1.5rem;
    margin: 5px;
    border: 2px solid mediumpurple;
  }

  .search:focus {
    animation: onClickBorderRadius 1.5s;
    animation-fill-mode: forwards;
  }

  .search:not(:focus) {
    animation: onClickBorderRadiusOut 1.5s;
    animation-fill-mode: forwards;
  }
</style>