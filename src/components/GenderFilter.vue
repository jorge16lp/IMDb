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
        for (let i=0; i < filters.length; i++)
          if (filters[i].textContent === this.filter)
            filters[i].style.display = "none";

        // activate SelectedFilter
        const selectedFilters = document.getElementsByClassName('selected_filter');
        for (let i=0; i < selectedFilters.length; i++)
          if (selectedFilters[i].textContent === this.filter + ' x')
            selectedFilters[i].style.display = "block";

        // activate SeparatorLine
        document.getElementById('separator').style.display = "block";
      }
    }
  };
</script>

<style scoped>
  @keyframes hoverColor {
    from { background-color: mediumpurple; }
    to { background-color: black; color: white }
  }

  @keyframes blink {
    from { opacity: 1; }
    to { opacity: 0; }
  }

  .filter:hover {
    font-weight: 600;
    cursor: pointer;
    animation: hoverColor;
    animation-fill-mode: forwards;
  }

  .filter:active {
    animation: blink 0.1s;
  }

  .filter {
    margin: 0 30px 4px;
    background-color: mediumpurple;
    color: black;
    font-weight: 600;
    padding: 0.3rem 1.5rem;
    border-radius: 2px;
    border: 2px solid mediumpurple;
  }

  @media (max-width: 495px) {
    .filter {
      font-size: 0.8rem;
      padding: 0.3rem 0.8rem;
    }
  }
</style>