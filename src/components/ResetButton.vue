<template>
  <input id="resetButton" class="reset_button" type="button" value="Reset Filters" @click="cleanFilters"/>
</template>

<script>
export default {
  methods: {
    cleanFilters() {
      // reset search
      document.getElementById('search').value = '';
      document.getElementById('searched_section').style.display = 'none';

      // reset selected filters
      const filters = document.getElementsByClassName('filter');
      for (let i = 0; i < filters.length; i++)
        filters[i].style.display = "block";
      const selectedFilters = document.getElementsByClassName('selected_filter');
      for (let i = 0; i < selectedFilters.length; i++)
        selectedFilters[i].style.display = "none";
      // reset genders separator line
      document.getElementById('gender_separator').style.display = "none";
      // reset actors separator line
      document.getElementById('actor_separator').style.display = "none";
      // reset directors separator line
      document.getElementById('director_separator').style.display = "none";

      // reset year slider value
      document.getElementById('year_slider').value = 2000;
      document.getElementById('apply_year_filter').checked = false;
      document.getElementById('byReleaseYear_section').style.display = 'none';

      // reset duration slider value
      document.getElementById('duration_slider').value = 2000;
      document.getElementById('apply_duration_filter').checked = false;
      document.getElementById('byDuration_section').style.display = 'none';

      // update store
      this.$store.commit('search/resetFilters');
      //this.$store.dispatch('characters/fetchCharacters');
    }
  }
}

</script>

<style scoped>
@keyframes hoverShadow {
  from {
    background-color: white;
    color: black;
  }
  to {
    border: 2px solid rebeccapurple;
    background-color: #151414;
    color: white;
  }
}

@keyframes blink {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

.reset_button {
  justify-self: center;
  align-self: center;
  width: 9rem;
  height: 1.5rem;
  border-radius: 1px;
  background-color: mediumpurple;
  color: white;
  margin: 10px 5px;
  border: 2px solid rebeccapurple;
}

.reset_button:hover {
  font-weight: bold;
  animation: hoverShadow 0s;
  animation-fill-mode: forwards;
}

.reset_button:active {
  animation: blink 0.5s;
}
</style>