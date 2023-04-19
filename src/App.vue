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

    <SeparatorLine class="filters_separator"/>

    <ReleaseYearSection id="releaseYear_filter" class="releaseYear_filter"/>

    <SeparatorLine class="filters_separator"/>

    <DurationSection id="duration_filter" class="duration_filter"/>

    <SeparatorLine class="filters_separator"/>

    <ActorFilterSection id="actor_filter"/>

    <SeparatorLine class="filters_separator"/>

    <DirectorFilterSection id="director_filter"/>

    <ResetButton class="reset_button"></ResetButton>

  </aside>
  <main id="main" class="main">

    <div id="searched_section" v-if="!(films.length === 0)">
      <h2 class="section_title">SEARCHED FILMS</h2>
      <div class="sliding">
        <button class="movement_button" @click="moveLeft('searched')">←</button>
        <BaseGrid id="searched" v-on:scroll="infiniteScrolling('searched')">
          <FilmCard
              v-for="film in films"
              v-bind:key="film.id"
              v-bind:film="film">
          </FilmCard>
        </BaseGrid>
        <button class="movement_button" @click="moveRight('searched')">→</button>
      </div>
    </div>

    <div id="fav_section" class="fav_section" style="display: none">
      <h2 id="fav_title" class="section_title">FAV MOVIES</h2>
      <div class="sliding">
        <button class="movement_button" @click="moveLeft('fav')">←</button>
        <BaseGrid id="fav" v-on:scroll="infiniteScrolling('fav')">
          <p class="noAvailable_text" v-if="favFilms.length === 0">NO FILMS ADDED TO FAV MOVIES</p>
          <FilmCard
              v-for="film in favFilms"
              v-bind:key="film.id"
              v-bind:film="film">
          </FilmCard>
        </BaseGrid>
        <button class="movement_button" @click="moveRight('fav')">→</button>
      </div>
    </div>

    <div id="byReleaseYear_section" class="byReleaseYear_section">
      <h2 id="byReleaseYear_title" class="section_title">BY RELEASE YEAR: 2000</h2>
      <div class="sliding">
        <button class="movement_button" @click="moveLeft('rel_year')">←</button>
        <BaseGrid id="rel_year" v-on:scroll="infiniteScrolling('rel_year')">
          <p class="noAvailable_text" v-if="byReleaseYearFilms.length === 0">NO FILM AVAILABLE FOR THIS FILTER 😕</p>
          <FilmCard
              v-for="film in byReleaseYearFilms"
              v-bind:key="film.id"
              v-bind:film="film">
          </FilmCard>
        </BaseGrid>
        <button class="movement_button" @click="moveRight('rel_year')">→</button>
      </div>
    </div>

    <!--
    <div id="byDuration_section" class="byDuration_section">
      <h2 id="byReleaseYear_title" class="section_title">BY DURATION: 90'</h2>
      <div class="sliding">
        <button class="movement_button" @click="moveLeft('duration')">←</button>
        <BaseGrid id="duration" v-on:scroll="infiniteScrolling('duration')">
          <p v-if="byDurationFilms.length === 0">NO FILM AVAILABLE FOR THIS FILTER 😕</p>
          <FilmCard
              v-for="film in byDurationFilms"
              v-bind:key="film.id"
              v-bind:film="film">
          </FilmCard>
        </BaseGrid>
        <button class="movement_button" @click="moveRight('duration')">→</button>
      </div>
    </div>
    -->

    <h2 class="section_title">NOW PLAYING</h2>
    <div class="sliding">
      <button class="movement_button" @click="moveLeft('nowPlaying')">←</button>
      <BaseGrid id="nowPlaying">
        <FilmCard
            v-for="film in nowPlayingFilms"
            v-bind:key="film.id"
            v-bind:film="film">
        </FilmCard>
      </BaseGrid>
      <button class="movement_button" @click="moveRight('nowPlaying')">→</button>
    </div>

    <h2 class="section_title">TOP RATED</h2>
    <div class="sliding">
      <button class="movement_button" @click="moveLeft('topRated')">←</button>
      <BaseGrid id="topRated">
        <FilmCard
            v-for="film in topRatedFilms"
            v-bind:key="film.id"
            v-bind:film="film">
        </FilmCard>
      </BaseGrid>
      <button class="movement_button" @click="moveRight('topRated')">→</button>
    </div>

    <h2 class="section_title">MOST POPULAR</h2>
    <div class="sliding">
      <button class="movement_button" @click="moveLeft('mostPopular')">←</button>
      <BaseGrid id="mostPopular">
        <FilmCard
            v-for="film in popularFilms"
            v-bind:key="film.id"
            v-bind:film="film">
        </FilmCard>
      </BaseGrid>
      <button class="movement_button" @click="moveRight('mostPopular')">→</button>
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
import DurationSection from "@/components/DurationSection.vue";

export default {
  components: {
    DurationSection,
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
          'action', 'adventure', 'animation', 'biography', 'comedy', 'crime', 'documentary', 'drama',
          'family', 'fantasy', 'film-noir', 'game-show', 'history', 'horror', 'music', 'musical',
          'mystery', 'news', 'reality-tv', 'romance', 'sci-fi', 'sport', 'talk-show', 'thriller', 'war', 'western'
        ]
      }
    };
  },
  mounted() {
    this.$store.dispatch('films/fetchSortedFilms');
    this.$store.dispatch('films/fetchFilmsByReleaseYear', 2000);
    //this.$store.dispatch('films/fetchFilmsByDuration', 90);
  },
  computed: {
    films() {
      return this.$store.getters['films/getFilms']
    },
    byReleaseYearFilms() {
      return this.$store.getters['films/getFilmsByReleaseYear']
    },
    byDurationFilms() {
      return this.$store.getters['films/getFilmsByDuration']
    },
    popularFilms() {
      return this.$store.getters['films/getMostPopularFilms']
    },
    topRatedFilms() {
      return this.$store.getters['films/getTopRatedFilms']
    },
    nowPlayingFilms() {
      return this.$store.getters['films/getNowPlayingFilms']
    },
    favFilms() {
      return this.$store.getters['films/getFavFilms']
    }
  },
  methods: {
    moveRight(section) {
      document.getElementById(section).scrollLeft += 896;
    },
    moveLeft(section) {
      document.getElementById(section).scrollLeft -= 896;
    },
    hideMenu() {
      document.getElementById('menu').style.display = 'none';
      document.getElementById('main').style.gridColumn = 'span 3';
      document.getElementById('menu_toggle').style.display = 'block';
      document.getElementById('menu_toggle').style.marginBottom = '10px';
    },
    infiniteScrolling(section) {
      const scrollContainer = document.getElementById(section);
      const scrollLeft = scrollContainer.scrollLeft;
      const contentWidth = scrollContainer.scrollWidth;

      if (scrollLeft === contentWidth - scrollContainer.clientWidth) {
        this.$store.dispatch('films/fetchFilms');

        console.log('Scroll infinito');
      }
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

@media (max-width: 600px) {

}
</style>
