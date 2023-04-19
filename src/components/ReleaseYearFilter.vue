<template>
  <div class="filter_releaseYear">
    <p class="min_year">1950</p>
    <input id="year_slider" type="range" min="1950" max="2023" value="2000" class="year_slider"
           v-on:input="updateActualYear()"/>
    <p id="max_year" class="max_year"></p>
    <div class="actual_year_container">
      <p id="actual_year" class="actual_year">2000</p>
      <input id="apply_year_filter" type="checkbox" v-on:click="handleChange"/>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    updateActualYear() {
      const value = document.getElementById('year_slider').value;
      document.getElementById('actual_year').innerHTML = value;
      document.getElementById('byReleaseYear_title').textContent = 'BY RELEASE YEAR: ' + value;
      if (!document.getElementById('apply_year_filter').checked)
        document.getElementById('apply_year_filter').click();

      this.$store.commit('search/setReleaseYear', value);
      this.$store.dispatch('films/fetchFilmsByReleaseYear', value);
    },
    handleChange() {
      if (document.getElementById('apply_year_filter').checked)
        document.getElementById('byReleaseYear_section').style.display = 'block';
      else
        document.getElementById('byReleaseYear_section').style.display = 'none';
    }
  },
  mounted() {
    document.getElementById('max_year').innerText = '' + new Date().getFullYear();
  }
};
</script>

<style lang="scss" scoped>
.filter_releaseYear {
  display: grid;
  grid-template: 2rem 2rem / 1fr 3fr 1fr;
  justify-content: center;
  align-items: center;

  .min_year {
    margin: 5px;
  }

  .max_year {
    margin: 5px;
    text-align: right;
  }



  .year_slider {
    align-self: center;
    cursor: pointer;
    border: 2px solid mediumpurple;
  }

  .year_slider::-webkit-slider-thumb {
    background-color: mediumpurple;
    color: white;
    margin-top: -4.5px;
  }

  .year_slider::-webkit-slider-runnable-track {
    height: 10px;
    background-color: black;
    border-radius: 5px;
    border: 2px solid rebeccapurple;
  }

  .actual_year_container {
    display: flex;
    justify-content: center;
    align-items: center;
    grid-column: 2;

    .actual_year {
      text-align: center;
      grid-column: 2;
      justify-self: center;
    }
  }
}
</style>