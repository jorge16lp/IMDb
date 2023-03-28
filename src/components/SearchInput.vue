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

  .search {
    width: 25rem;
    height: 1.5rem;
    border: 2px solid mediumpurple;
  }

  .search:focus {
    animation: onClickBorderRadius 1s;
    animation-fill-mode: forwards;
  }
</style>