<template>
  <label for="search">
    <input id="search" type="text" class="search" placeholder="Search by film name, actor, director..."
           @input="setQuery($event.target.value)"/>
  </label>
</template>

<script>
export default {
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
  from {
    border-radius: 3px;
  }
  to {
    border-radius: 20px;
  }
}

@keyframes onClickBorderRadiusOut {
  from {
    border-radius: 20px;
  }
  to {
    border-radius: 3px;
  }
}

.search {
  background-color: black;
  color: white;
  border-radius: 3px;
  width: 100%;
  height: 1.5rem;
  margin: 5px;
  border: 2px solid rebeccapurple;
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