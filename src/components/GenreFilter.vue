<template>
  <button class="filter" @click="addFilter">{{ filter }}</button>
</template>

<script>

export default {
  props: ['filter'],
  methods: {
    addFilter() {
      this.$store.commit('search/addGender', this.filter);

      // desactivate GenderFilter
      const filters = document.getElementsByClassName('filter');
      for (let i = 0; i < filters.length; i++)
        if (filters[i].textContent === this.filter)
          filters[i].style.display = "none";

      // activate SelectedFilter
      const selectedFilters = document.getElementsByClassName('selected_filter');
      for (let i = 0; i < selectedFilters.length; i++)
        if (selectedFilters[i].textContent === this.filter + ' x')
          selectedFilters[i].style.display = "block";

      // activate gender SeparatorLine
      document.getElementById('gender_separator').style.display = "block";
    }
  }
};
</script>

<style scoped>
.filter:hover {
  font-weight: 600;
  cursor: pointer;
  background-color: #151414;
  color: white
}

.filter {
  margin: 0 30px 4px;
  background-color: mediumpurple;
  color: #151414;
  font-weight: 600;
  padding: 0.3rem 1.5rem;
  border-radius: 2px;
  border: 2px solid mediumpurple;
  width: 75%;
}
</style>