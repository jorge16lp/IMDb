<template>
  <div class="gender_filter">
    <h2>GENRES</h2>
    <div class="selected_genders_container">
      <BaseFilter v-bind:filters="filters.gender" v-slot="slotProps">
        <SelectedGenreFilter :filter="slotProps.filter" display="none"/>
      </BaseFilter>
    </div>
    <SeparatorLine id="gender_separator"/>
    <BaseFilter v-bind:filters="filters.gender" v-slot="slotProps">
      <GenreFilter :filter="slotProps.filter"/>
    </BaseFilter>
  </div>
</template>

<script>
import GenreFilter from '@/components/SearchInput.vue';
import BaseFilter from "@/components/BaseFilter.vue";
import SelectedGenreFilter from "@/components/SelectedGenreFilter.vue";
import SeparatorLine from "@/components/SeparatorLine.vue";

export default {
  data() {
    return {
      filters: {
        gender: [
          //'comedy', 'adventure', 'family', 'sci-fi', 'history', 'action', 'mystery', 'war', 'crime', 'fantasy',
          //'horror', 'news', 'sport', 'western', 'animation', 'documentary', 'film-noir', 'music', 'reality-tv',
          'talk-show', 'biography', 'drama', 'game-show', 'musical', 'romance', 'thriller'
        ]
      }
    };
  },
  components: {
    GenreFilter, BaseFilter, SeparatorLine, SelectedGenreFilter
  },
  methods: {

  }
};
</script>

<style lang="scss" scoped>
.header {
  background-color: black;
  grid-column: span 3;
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
  align-items: center;

  .menu_toggle {
    width: 60%;
    height: 50%;
    font-size: 23px;
    border-radius: 3px;
    justify-self: center;
    background-color: black;
    color: white;
    border: 2px solid #333;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .logo {
    width: 10rem;
    height: 5rem;
    border-radius: 30px;
    justify-self: center;
  }
}
</style>