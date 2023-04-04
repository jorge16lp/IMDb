<template>
  <HeaderContent/>
  <aside id="menu" class="menu">

    <div class="back_button_container">
      <button class="back_menu_button" @click="hideMenu">←</button>
    </div>

    <FiltersSelection/>

    <SeparatorLine id="selectors-genre" class="filters_separator"/>

    <div id="gender_filter" class="gender_filter">
      <h2 class="filter_title">GENRES</h2>
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

    <SeparatorLine id="genre-year" class="filters_separator"/>

    <ReleaseYearSection id="releaseYear_filter" class="releaseYear_filter"/>

    <SeparatorLine id="year-duration" class="filters_separator"/>

    <div>

    </div>

    <SeparatorLine id="duration-actor" class="filters_separator"/>

    <ActorFilterSection id="actor_filter"/>

    <SeparatorLine id="actor-director" class="filters_separator"/>

    <DirectorFilterSection id="director_filter"/>

    <ResetButton class="reset_button"></ResetButton>

  </aside>
  <main id="main" class="main">
    <div>
      <h2 class="section_title">MOST VIEWED</h2>
      <div class="sliding">
        <button class="movement_button" @click="moveLeft('mostViewed')">←</button>
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
        <button class="movement_button" @click="moveRight('mostViewed')">→</button>
      </div>
      <h2 class="section_title">MOST POPULAR</h2>
      <div class="sliding">
        <button class="movement_button" @click="moveLeft('mostPopular')">←</button>
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
        <button class="movement_button" @click="moveRight('mostPopular')">→</button>
      </div>
    </div>
  </main>
  <FooterContent/>
</template>
<script lang="js">
import BaseGrid from '@/components/BaseGrid.vue';
import FilmCard from '@/components/FilmCard.vue';
import ResetButton from "@/components/ResetButton.vue";
import SeparatorLine from "@/components/SeparatorLine.vue";
import HeaderContent from "@/components/HeaderContent.vue";
import ReleaseYearSection from "@/components/ReleaseYearSection.vue";
import FooterContent from "@/components/FooterContent.vue";
import ActorFilterSection from "@/components/ActorFilterSection.vue";
import DirectorFilterSection from "@/components/DirectorFilterSection.vue";
import BaseFilter from "@/components/BaseFilter.vue";
import GenreFilter from "@/components/GenreFilter.vue";
import SelectedGenreFilter from "@/components/SelectedGenreFilter.vue";
import FiltersSelection from "@/components/FiltersSelection.vue";

export default {
  components: {
    FiltersSelection,
    SelectedGenreFilter,
    GenreFilter,
    BaseFilter,
    DirectorFilterSection,
    FooterContent,
    ReleaseYearSection,
    HeaderContent,
    SeparatorLine,
    ResetButton,
    FilmCard,
    BaseGrid,
    ActorFilterSection,
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
    moveRight(section) {
      document.getElementById(section).scrollLeft += 224;
    },
    moveLeft(section) {
      document.getElementById(section).scrollLeft -= 224;
    },
    hideMenu() {
      document.getElementById('menu').style.display = 'none';
      document.getElementById('main').style.gridColumn = 'span 3';
      document.getElementById('menu_toggle').style.display = 'block';
      document.getElementById('menu_toggle').style.marginBottom = '10px';
      //document.getElementById('header').style.gridColumn = 'span 3';
      //document.getElementById('header').style.gridTemplateColumns = '2fr 1fr';
    }
  }
};
</script>

<style lang="scss" scoped>
aside {
  .filters_separator {
    display: block;
    border: 1px solid black;
    width: 100%;
    box-shadow: 0 0 0 0.1px white;
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
    border: 1px solid rebeccapurple;
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

@media (max-width: 600px) {
  .main {
    grid-row: 3;
  }
}
</style>
