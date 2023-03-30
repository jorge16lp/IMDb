<template>
  <button class="filter" @click="setFilter">{{ filter }}</button>
</template>

<script>
export default {
  props: ['filter'],
  methods: {
    setFilter() {
      this.$store.commit('search/setSpecie', this.filter);
      this.$store.dispatch('characters/fetchCharacters');
    }
  }
};
</script>

<style scoped>
  @keyframes hoverColor {
    from { background-color: mediumpurple; }
    to { background-color: black; color: white; }
  }

  .filter:hover {
    font-weight: 600;
    cursor: pointer;
    animation: hoverColor;
    animation-fill-mode: forwards;
  }

  .filter {
    margin-bottom: 4px;
    background-color: mediumpurple;
    color: black;
    font-weight: 600;
    padding: 0.3rem 1.5rem;
    border-radius: 2px;
    border: 2px solid mediumpurple;
  }
</style>