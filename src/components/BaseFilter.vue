<template>
    <div class="button_container" v-for="filter in filters" v-bind:key="filter">
      <slot :filter="filter"></slot>
    </div>
</template>

<script>
  export default {
    props: ['filters']
  };
</script>

<style scoped>
  .button_container {
    /*
    width: 200px;
    list-style-type: none;
     */
    width: 100%;
  }
</style>