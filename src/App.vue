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
    <h2 class="section_title">SEARCHED FILMS</h2>
    <div class="sliding">
      <button class="movement_button" @click="moveLeft('mostViewed')">←</button>
      <BaseGrid id="mostViewed">
        <p class="no_films" v-if="films.length === 0">NO FILMS AVAILABLE&nbsp;😕</p>
        <FilmCard
            v-for="film in films"
            v-bind:key="film.id"
            v-bind:film="film">
        </FilmCard>
      </BaseGrid>
      <button class="movement_button" @click="moveRight('mostViewed')">→</button>
    </div>
    <!--
    <h2 class="section_title">MOST POPULAR</h2>
    <div class="sliding">
      <button class="movement_button" @click="moveLeft('mostPopular')">←</button>
      <BaseGrid id="mostPopular">
        <FilmCard
            v-for="film in films"
            v-bind:key="film.id"
            v-bind:film="film">
        </FilmCard>
      </BaseGrid>
      <button class="movement_button" @click="moveRight('mostPopular')">→</button>
    </div>
    <h2 class="section_title">MOST AWARDED</h2>
    <div class="sliding">
      <button class="movement_button" @click="moveLeft('mostAwarded')">←</button>
      <BaseGrid id="mostAwarded">
        <FilmCard
            v-for="film in films"
            v-bind:key="film.id"
            v-bind:film="film">
        </FilmCard>
      </BaseGrid>
      <button class="movement_button" @click="moveRight('mostAwarded')">→</button>
    </div>
    -->
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
    this.$store.dispatch('films/fetchFilms', 1);

    const scrollContainer = document.getElementById('mostViewed');
    scrollContainer.addEventListener('scroll', (event) => {
      const scrollContainer = event.target;
      const scrollLeft = scrollContainer.scrollLeft;
      const contentWidth = scrollContainer.scrollWidth;

      if (scrollLeft === contentWidth - scrollContainer.clientWidth) {
        this.$store.dispatch('films/fetchFilms');

        // Lógica para cargar más contenido o hacer acciones de scroll infinito
        console.log('Scroll infinito detectado en el final de la sección horizontal');
      }
    });
  },
  computed: {
    films() {
      return this.$store.getters['films/getFilms']
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
