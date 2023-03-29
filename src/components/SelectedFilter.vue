<template>
  <button class="selected_filter" @click="removeFilter">
    {{ filter }} x</button>
</template>

<script>
  export default {
    props: ['filter'],
    methods: {
      removeFilter() {
        this.$store.commit('search/removeGender', this.filter);

        // desactivate SelectedFilter
        const selectedFilters = document.getElementsByClassName('selected_filter');
        for (let i=0; i < selectedFilters.length; i++)
          if (selectedFilters[i].textContent === this.filter + ' x')
            selectedFilters[i].style.display = "none";

        // activate GenderFilter
        const filters = document.getElementsByClassName('filter');
        for (let i=0; i < filters.length; i++)
          if (filters[i].textContent === this.filter)
            filters[i].style.display = "block";

        // if no more selected filters: desactivate SeparatorLine
        let allDesactivated = true;
        for (let i=0; i < selectedFilters.length; i++)
          if (selectedFilters[i].style.display === "block")
            allDesactivated = false;
        if (allDesactivated)
          document.getElementById('separator').style.display = "none";
      }
    }
  };
</script>

<style scoped>
  .selected_filter {
    background-color: black;
    border: 2px solid mediumpurple;
    font-weight: 600;
    border-radius: 2px;
    color: white;
    margin: 0 30px 4px;
    display: none;
  }

  .selected_filter:hover {
    color: #c0c0c0;
  }
</style>