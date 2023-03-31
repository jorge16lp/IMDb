<template>
  <HeaderContent />
  <aside id="menu" class="menu">

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

    <SeparatorLine class="filters_separator"/>

    <ReleaseYearSection/>

    <SeparatorLine class="filters_separator"/>

    <ActorFilterSection/>

    <SeparatorLine class="filters_separator"/>

    <DirectorFilterSection/>

    <ResetButton class="reset_button" v-on:click="cleanFilters()"></ResetButton>

  </aside>
  <main id="main" class="main">
    <div>
      <h2 class="section_title">MOST VIEWED</h2>
      <div class="sliding">
        <button class="movement_button" @click="moveLeft('mostViewed')"> ←</button>
        <BaseGrid id="mostViewed">
          <FilmCard></FilmCard>
          <FilmCard></FilmCard>
          <FilmCard></FilmCard>
          <FilmCard></FilmCard>
          <FilmCard></FilmCard>
          <FilmCard></FilmCard>
          <FilmCard></FilmCard>
          <FilmCard></FilmCard>
          <FilmCard></FilmCard>
          <FilmCard></FilmCard>
          <FilmCard></FilmCard>
          <FilmCard></FilmCard>
          <FilmCard></FilmCard>
          <FilmCard></FilmCard>
          <FilmCard></FilmCard>
          <FilmCard></FilmCard>
        </BaseGrid>
        <button class="movement_button" @click="moveRight('mostViewed')"> →</button>
      </div>
      <h2 class="section_title">MOST POPULAR</h2>
      <div class="sliding">
        <button class="movement_button" @click="moveLeft('mostPopular')"> ←</button>
        <BaseGrid id="mostPopular">
          <FilmCard></FilmCard>
          <FilmCard></FilmCard>
          <FilmCard></FilmCard>
          <FilmCard></FilmCard>
          <FilmCard></FilmCard>
          <FilmCard></FilmCard>
          <FilmCard></FilmCard>
          <FilmCard></FilmCard>
          <FilmCard></FilmCard>
          <FilmCard></FilmCard>
          <FilmCard></FilmCard>
          <FilmCard></FilmCard>
          <FilmCard></FilmCard>
          <FilmCard></FilmCard>
          <FilmCard></FilmCard>
          <FilmCard></FilmCard>
        </BaseGrid>
        <button class="movement_button" @click="moveRight('mostPopular')"> →</button>
      </div>
    </div>
  </main>
  <FooterContent/>
</template>
<script lang="js">
import BaseFilter from '@/components/BaseFilter.vue';
import BaseGrid from '@/components/BaseGrid.vue';
import FilmCard from '@/components/FilmCard.vue';
import ResetButton from "@/components/ResetButton.vue";
import GenreFilter from "@/components/GenreFilter.vue";
import SeparatorLine from "@/components/SeparatorLine.vue";
import SelectedGenreFilter from "@/components/SelectedGenreFilter.vue";
import HeaderContent from "@/components/HeaderContent.vue";
import ReleaseYearSection from "@/components/ReleaseYearSection.vue";
import FooterContent from "@/components/FooterContent.vue";
import ActorFilterSection from "@/components/ActorFilterSection.vue";
import DirectorFilterSection from "@/components/DirectorFilterSection.vue";

export default {
  components: {
    DirectorFilterSection,
    FooterContent,
    ReleaseYearSection,
    HeaderContent,
    SeparatorLine,
    GenreFilter,
    ResetButton,
    FilmCard,
    BaseFilter,
    BaseGrid,
    SelectedGenreFilter,
    ActorFilterSection
  },
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
  mounted() {
    this.$store.dispatch('characters/fetchCharacters');
  },
  computed: {
    characters() {
      return this.$store.getters['characters/getCharacters']
    }
  },
  methods: {
    cleanFilters() {
      // reset gender filters
      const filters = document.getElementsByClassName('filter');
      for (let i = 0; i < filters.length; i++)
        filters[i].style.display = "block";
      const selectedFilters = document.getElementsByClassName('selected_filter');
      for (let i = 0; i < selectedFilters.length; i++)
        selectedFilters[i].style.display = "none";
      // reset gender separator line
      document.getElementById('gender_separator').style.display = "none";
      // reset slider value
      document.getElementById('slider').value = 2000;
      document.getElementById('actual_year').innerText = '2000';

      // update store
      this.$store.commit('search/resetFilters');
      //this.$store.dispatch('characters/fetchCharacters');
    },
    moveRight(section) {
      document.getElementById(section).scrollLeft += 224;
    },
    moveLeft(section) {
      document.getElementById(section).scrollLeft -= 224;
    }
  }
};
</script>
<style lang="scss" scoped>


aside {
  color: white;
  border: 1px solid mediumpurple;
  border-radius: 3px;
  width: 95%;
  top: 50px;
  background-color: #151414;
  padding: 10px;
  display: none;

  .filters_separator {
    display: block;
    border: 1px solid black;
    width: 100%;
    box-shadow: 0 0 0 0.1px white;
  }

  .gender_filter {
    .selected_genders_container {
      display: flow;
    }
  }
}

main {
  background-color: black;
  grid-column: span 3;
  margin-right: 10px;

  .sliding {
    align-items: center;
    display: flex;
    flex-flow: row nowrap;
    position: relative;
  }

  .movement_button {
    border: 1px solid mediumpurple;
    background-color: black;
    color: white;
    border-radius: 3px;
    margin: 5px;
  }

  .movement_button:hover {
    background-color: mediumpurple;
  }

  .movement_button:active {
    animation: blink 0.5s;
  }
}
</style>
