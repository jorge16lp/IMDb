<template>
  <header class="header">
    <img src="/logo.png" class="logo" alt="IMDb logo">
    <SearchInput />
  </header>
    <aside>
      <h2 class="status_header">GENDER</h2>
      <div class="filter_gender">
        <div id="genders_selected">

        </div>
        <SeparatorLine/> <!-- luego la quito, solo aparecerá cuando haya filtros seleccionados -->
        <BaseFilterList v-bind:filters="filters.gender" v-slot="slotProps">
          <GenderFilter :filter="slotProps.filter" />
        </BaseFilterList>
      </div>
      <h2 class="species_header">RELEASE YEAR</h2>
      <ReleaseYearFilter />

      <!--
      <BaseFilterList v-bind:filters="filters.species" v-slot="slotProps">
        <SpeciesFilter :filter="slotProps.filter" />
      </BaseFilterList>
    -->
      <ResetButton class="reset_button" v-on:click="cleanFilters()"></ResetButton>
    </aside>
    <main class="main">
      <div>
        <h2 class="section_title">MOST VIEWED</h2>
        <BaseGrid>
          <FilmCard></FilmCard><FilmCard></FilmCard><FilmCard></FilmCard><FilmCard></FilmCard>
          <FilmCard></FilmCard><FilmCard></FilmCard><FilmCard></FilmCard><FilmCard></FilmCard>
          <FilmCard></FilmCard><FilmCard></FilmCard><FilmCard></FilmCard><FilmCard></FilmCard>
          <FilmCard></FilmCard><FilmCard></FilmCard><FilmCard></FilmCard><FilmCard></FilmCard>
        <!--
          <CharacterCard
              v-for="character in characters"
              v-bind:key="character.id"
              v-bind:character="character"/>
        -->
        </BaseGrid>
        <h2 class="section_title">MOST POPULAR</h2>
        <BaseGrid>
          <FilmCard></FilmCard><FilmCard></FilmCard><FilmCard></FilmCard><FilmCard></FilmCard>
          <FilmCard></FilmCard><FilmCard></FilmCard><FilmCard></FilmCard><FilmCard></FilmCard>
          <FilmCard></FilmCard><FilmCard></FilmCard><FilmCard></FilmCard><FilmCard></FilmCard>
          <FilmCard></FilmCard><FilmCard></FilmCard><FilmCard></FilmCard><FilmCard></FilmCard>
        </BaseGrid>
      </div>
    </main>
  <footer>
    <p>Made by Jorge López Peláez - Academy Frontend Software at Empathy.co</p>
  </footer>
</template>
<script lang="js">
  import BaseFilterList from '@/components/BaseFilterList.vue';
  import BaseGrid from '@/components/BaseGrid.vue';
  import FilmCard from '@/components/FilmCard.vue';
  import SearchInput from '@/components/SearchInput.vue';
  import ResetButton from "@/components/ResetButton.vue";
  import GenderFilter from "@/components/GenderFilter.vue";
  import ReleaseYearFilter from "@/components/ReleaseYearFilter.vue";
  import SeparatorLine from "@/components/SeparatorLine.vue";

  export default {
    components: {
      SeparatorLine,
      GenderFilter,
      ResetButton,
      SearchInput,
      FilmCard,
      BaseFilterList,
      BaseGrid,
      ReleaseYearFilter
    },
    data() {
      return {
        filters: {
          gender: ['horror', 'adventure', 'romantic', 'science fiction', 'mystery']
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
        this.$store.commit('search/setStatus', '');
        this.$store.commit('search/setSpecie', '');
        this.$store.dispatch('characters/fetchCharacters');
      }
    }
  };
</script>
<style scoped>
  h2 {
    text-align: center;
    margin: 5px;
    background-image: linear-gradient(to right, mediumpurple, black, mediumpurple);
    border-radius: 10px;
  }

  .header {
    background-color: black;
    grid-column: span 3;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    /*border: 2px solid mediumpurple;*/
  }

  aside {
    color: white;
    grid-row: 2;
    display: flex;
    flex-flow: column;
    /*border: 2px solid mediumpurple;*/
  }

  main {
    background-color: black;
    grid-column: span 2;
    margin-right: 10px;
    /*border: 2px solid mediumpurple;*/
  }

  .logo {
    width: 10rem;
    height: 5rem;
    border-radius: 30px;
  }

  footer {
    background-color: black;
    grid-column: span 3;
    display: flex;
    justify-content: center;
    border: 2px solid mediumpurple;
    margin-bottom: 10px;
  }

  @media(max-width: 1144px) {
    header {
      font-size: 0.7rem;
    }
  }

  @media (max-width: 744px) {
    header {
      grid-column: span 2;
      font-size: 0.6rem;
    }

    aside {
      grid-row: 3;
      grid-column: span 3;
      display: grid;
      grid-template: 0.5fr 2fr 0.5fr / 50% 50%;
    }

    .species_header {
      grid-column: 2;
      grid-row: 1;
    }

    .reset_button {
      grid-row: 3;
      grid-column: span 2;
    }

    .header {
      grid-column: span 2;
    }

    .main {
      grid-column: span 3;
    }

    input {
      grid-row: 2;
    }

    footer {
      grid-row: 5;
    }
  }

  @media (max-width: 495px) {
    .status_header {
      justify-self: center;
      width: 10rem;
      max-height: 1.5rem;
      font-size: 1rem;
    }

    .species_header {
      justify-self: center;
      width: 10rem;
      max-height: 1.5rem;
      font-size: 1rem;
    }
  }
</style>
