<template>
  <header class="header">
    <button class="menu_toggle" @click="toggleMenu">Menu</button>
    <SearchInput/>
    <img src="/logo.png" class="logo" alt="IMDb logo">
  </header>
  <aside id="menu" class="menu">
    <div class="gender_filter">
      <h2 class="gender_header">GENDER</h2>
      <div class="selected_genders_container">
        <BaseFilter v-bind:filters="filters.gender" v-slot="slotProps">
          <SelectedGenderFilter :filter="slotProps.filter" display="none"/>
        </BaseFilter>
      </div>
      <SeparatorLine/>
      <BaseFilter v-bind:filters="filters.gender" v-slot="slotProps">
        <GenderFilter :filter="slotProps.filter"/>
      </BaseFilter>
    </div>
    <div class="releaseYear_filter">
      <h2 class="releaseYear_header">RELEASE YEAR</h2>
      <ReleaseYearFilter/>
    </div>
    <div class="actor_filter">
      <h2 class="actor_header">ACTORS</h2>
      <input placeholder="Actor..." type="text" class="actors_txt"/>
      <input class="actors_button" type="image" src="/logo.png" alt="image button to ad actors to filter">
    </div>
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
  <footer>
    <p>
      Frontend made by Jorge López - Academy Frontend Software at Empathy.co
      <br>
      Backend made by Tania Bajo & Raúl Álvarez - Academy Backend Software at Empathy.co
    </p>
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
import SelectedGenderFilter from "@/components/SelectedGenderFilter.vue";

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
    SelectedGenderFilter
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
      for (let i = 0; i < filters.length; i++)
        filters[i].style.display = "block";
      const selectedFilters = document.getElementsByClassName('selected_filter');
      for (let i = 0; i < selectedFilters.length; i++)
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
    },
    toggleMenu() {
      if (document.getElementById('menu').style.display === 'none') {
        document.getElementById('menu').style.display = 'block';
        document.getElementById('main').style.gridColumn = 'span 2';
      } else {
        document.getElementById('menu').style.display = 'none';
        document.getElementById('main').style.gridColumn = 'span 3';
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@keyframes onClickBorderRadius {
  from {
    border-radius: 0;
  }
  to {
    border-radius: 20px;
  }
}
@keyframes onClickBorderRadiusOut {
  from {
    border-radius: 20px;
  }
  to {
    border-radius: 0;
  }
}
@keyframes blink {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
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
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
  align-items: center;

  .menu_toggle {
    width: 60%;
    height: 50%;
    font-size: 16px;
    border-radius: 3px;
    justify-self: center;
    background-color: black;
    color: white;
    border: 2px solid #333;
  }

  .logo {
    width: 10rem;
    height: 5rem;
    border-radius: 30px;
    justify-self: center;
  }
}

aside {
  color: white;
  border: 1px solid mediumpurple;
  border-radius: 3px;
  width: 95%;
  top: 50px;
  background-color: #151414;
  padding: 10px;
  display: none;

  .selected_genders_container {
    display: flow;
  }

  .releaseYear_filter {
    border-top: 1px solid white;
    margin-top: 15px;
    padding-top: 10px;
  }

  .actors_txt {
    margin-left: 10px;
    width: 70%;
    border: 2px solid mediumpurple;
  }

  .actors_txt:focus {
    animation: onClickBorderRadius 1.5s;
    animation-fill-mode: forwards;
  }

  .actors_txt:not(:focus) {
    animation: onClickBorderRadiusOut 1.5s;
    animation-fill-mode: forwards;
  }

  .actors_button {
    margin-left: 5px;
    width: 20%;
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


footer {
  background-color: black;
  grid-column: span 3;
  display: flex;
  justify-content: center;
  border-top: 1px solid mediumpurple;
  margin-bottom: 15px;
  text-align: center;
}
</style>
