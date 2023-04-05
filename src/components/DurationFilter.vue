<template>
  <div class="filter_duration">
    <p class="min_duration">20'</p>
    <input id="duration_slider" type="range" min="20" max="240" value="90" class="duration_slider" v-on:input="updateDuration()"/>
    <p class="max_duration">240'</p>
    <p id="actual_duration" class="actual_duration">90'<input id="apply_duration_filter" type="checkbox"/></p>
  </div>
</template>

<script>
export default {
  methods: {
    updateDuration() {
      document.getElementById('actual_duration').innerHTML = document.getElementById('duration_slider').value
          + '\'' + '<input id="apply_duration_filter" type="checkbox" checked/>';

      this.$store.commit('search/setDuration',
          document.getElementById('duration_slider').value);

    }
  },
  mounted() {
    // coger valores de peli más larga y más corta para los extremos
    // ponerles ids a los max y min para hacerlo
  }
};
</script>

<style lang="scss" scoped>
.filter_duration {
  display: grid;
  grid-template: 1fr 0.2fr / 1fr 3fr 1fr;
  justify-content: center;
  align-items: center;

  .min_duration {
    margin: 5px;
  }

  .max_duration {
    margin: 5px;
    text-align: right;
  }

  .actual_duration {
    text-align: center;
    grid-column: 2;
  }

  .duration_slider {
    align-self: center;
    cursor: pointer;
    border: 2px solid mediumpurple;
  }

  .duration_slider::-webkit-slider-thumb {
    background-color: mediumpurple;
    color: white;
    margin-top: -4.5px;
  }

  .duration_slider::-webkit-slider-runnable-track {
    height: 10px;
    background-color: black;
    border-radius: 5px;
    border: 2px solid rebeccapurple;
  }
}
</style>