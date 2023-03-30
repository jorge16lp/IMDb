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

</style>