<template>
  <div class="filter_releaseYear">
    <p class="min_year">1950</p>
    <input id="slider" type="range" min="1950" max="2023" value="2000" class="slider" v-on:input="updateActualYear()"/>
    <p id="max_year" class="max_year"></p>
    <p id="actual_year" class="actual_year">2000<input id="apply_year_filter" type="checkbox"/></p>
    <!--
    <label class="apply_releaseYear" for="apply_releaseYear">
      <input id="apply_releaseYear" type="checkbox"/>apply
    </label>
    -->
  </div>
</template>

<script>
export default {
  methods: {
    updateActualYear() {
      //document.getElementById('actual_year').innerText = document.getElementById('slider').value;
      document.getElementById('actual_year').innerHTML = document.getElementById('slider').value
          + '<input id="apply_year_filter" type="checkbox" checked/>';
      this.$store.commit('search/setReleaseYear',
          document.getElementById('slider').value);
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
  grid-template: 1fr 0.2fr / 1fr 3fr 1fr;
  justify-content: center;
  align-items: center;

  .min_year {
    margin: 5px;
  }

  .max_year {
    margin: 5px;
    text-align: right;
  }

  .actual_year {
    text-align: center;
    grid-column: 2;
  }

  .slider {
    align-self: center;
    cursor: pointer;
    border: 2px solid mediumpurple;
  }

  .slider::-webkit-slider-thumb {
    background-color: mediumpurple;
    color: white;
    margin-top: -4.5px;
  }

  .slider::-webkit-slider-runnable-track {
    height: 10px;
    background-color: black;
    border-radius: 5px;
    border: 2px solid rebeccapurple;
  }

  .apply_releaseYear {
    grid-row: 2;
    grid-column: 1;
  }
}
</style>