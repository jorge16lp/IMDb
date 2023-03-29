<template>
  <header class="header">
    <img src="/logo.png" class="logo" alt="IMDb logo">
    <SearchInput />
  </header>
    <aside>
      <h2 class="status_header">GENDER</h2>
      <div class="filter_gender">
        <div class="selected_genders_container">
          <BaseFilter v-bind:filters="filters.gender" v-slot="slotProps">
            <SelectedFilter :filter="slotProps.filter" display="none"/>
          </BaseFilter>
        </div>
        <SeparatorLine/>
        <BaseFilter v-bind:filters="filters.gender" v-slot="slotProps">
          <GenderFilter :filter="slotProps.filter" />
        </BaseFilter>
      </div>
      <h2 class="species_header">RELEASE YEAR</h2>
      <ReleaseYearFilter />
      <ResetButton class="reset_button" v-on:click="cleanFilters()"></ResetButton>
    </aside>
    <main class="main">
      <div>
        <h2 class="section_title">MOST VIEWED</h2>
        <div class="sliding">
          <button class="movement_button" @click="moveLeft('mostViewed')"> ← </button>
          <BaseGrid id="mostViewed">
            <FilmCard></FilmCard><FilmCard></FilmCard><FilmCard></FilmCard><FilmCard></FilmCard>
            <FilmCard></FilmCard><FilmCard></FilmCard><FilmCard></FilmCard><FilmCard></FilmCard>
            <FilmCard></FilmCard><FilmCard></FilmCard><FilmCard></FilmCard><FilmCard></FilmCard>
            <FilmCard></FilmCard><FilmCard></FilmCard><FilmCard></FilmCard><FilmCard></FilmCard>
          </BaseGrid>
          <button class="movement_button" @click="moveRight('mostViewed')"> → </button>
        </div>
        <h2 class="section_title">MOST POPULAR</h2>
        <div class="sliding">
          <button class="movement_button" @click="moveLeft('mostPopular')"> ← </button>
          <BaseGrid id="mostPopular">
            <FilmCard></FilmCard><FilmCard></FilmCard><FilmCard></FilmCard><FilmCard></FilmCard>
            <FilmCard></FilmCard><FilmCard></FilmCard><FilmCard></FilmCard><FilmCard></FilmCard>
            <FilmCard></FilmCard><FilmCard></FilmCard><FilmCard></FilmCard><FilmCard></FilmCard>
            <FilmCard></FilmCard><FilmCard></FilmCard><FilmCard></FilmCard><FilmCard></FilmCard>
          </BaseGrid>
          <button class="movement_button" @click="moveRight('mostPopular')"> → </button>
        </div>
      </div>
    </main>
  <footer>
    <p>Made by Jorge López Peláez - Academy Frontend Software at Empathy.co</p>
  </footer>
</template>
<script lang="js">
  import BaseFilter from '@/components/BaseFilter.vue';
  import BaseGrid from '@/components/BaseGrid.vue';
  import FilmCard from '@/components/FilmCard.vue';
  import SearchInput from '@/components/SearchInput.vue';
  import ResetButton from "@/components/ResetButton.vue";
  import GenderFilter from "@/components/GenderFilter.vue";
  import ReleaseYearFilter from "@/components/ReleaseYearFilter.vue";
  import SeparatorLine from "@/components/SeparatorLine.vue";
  import SelectedFilter from "@/components/SelectedFilter.vue";

  export default {
    components: {
      SeparatorLine,
      GenderFilter,
      ResetButton,
      SearchInput,
      FilmCard,
      BaseFilter,
      BaseGrid,
      ReleaseYearFilter,
      SelectedFilter
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
        // reset gender filters
        const filters = document.getElementsByClassName('filter');
        for (let i=0; i < filters.length; i++)
          filters[i].style.display = "block";
        const selectedFilters = document.getElementsByClassName('selected_filter');
        for (let i=0; i < selectedFilters.length; i++)
          selectedFilters[i].style.display = "none";
        // reset separator line
        document.getElementById('separator').style.display = "none";
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
<style scoped>
  .sliding{
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

  @keyframes blink {
    from { opacity: 1; }
    to { opacity: 0; }
  }

  .movement_button:active {
    animation: blink 0.5s;
  }

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

  .selected_genders_container {
    display: flow;
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
