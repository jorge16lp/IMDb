<template>
  <hr class="separator">
</template>

<script>
  export default {
    methods: {
      updateActualYear() {
        document.getElementById('actual_year').innerText =
            document.getElementById('slider').value;
      }
    }
  };
</script>

<style scoped>
  .separator {
    width: 80%;
    border: 1px solid mediumpurple;
    color: mediumpurple;
    box-shadow: 0 0 6px 0.5px white;
  }
</style>