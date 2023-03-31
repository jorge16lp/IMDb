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

    <div class="txt_filter">
      <h2>ACTORS</h2>
      <div id="selected_actors_container" class="selected_container"></div>
      <SeparatorLine id="actor_separator"/>
      <input id="actors_txt" placeholder="Search by actor name..." type="text" class="txt_input"
             v-on:keydown="enterActor"/>
      <button class="add_button" @click="addActor">+</button>
    </div>

    <SeparatorLine class="filters_separator"/>

    <div class="txt_filter">
      <h2>DIRECTORS</h2>
      <div id="selected_directors_container" class="selected_container"></div>
      <SeparatorLine id="director_separator"/>
      <input id="directors_txt" placeholder="Search by director name..." type="text" class="txt_input"
             v-on:keydown="enterDirector"/>
      <button class="add_button" @click="addDirector">+</button>
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

export default {
  components: {
    FooterContent,
    ReleaseYearSection,
    HeaderContent,
    SeparatorLine,
    GenreFilter,
    ResetButton,
    FilmCard,
    BaseFilter,
    BaseGrid,
    SelectedGenreFilter
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
    },
    addActor() {
      const actor = document.getElementById('actors_txt').value;

      const store = this.$store; // store reference

      if (!(actor === '')) {
        let isNewActor = true;
        const selected_actors = document.getElementById('selected_actors_container').childNodes;
        for (let i = 0; i < selected_actors.length; i++)
          if (selected_actors[i].textContent === actor + ' x')
            isNewActor = false;

        if (isNewActor) {
          // to add actor to de search store
          store.commit('search/addActor', actor);

          // create a selected actor filter
          let button = document.createElement('button');
          button.id = actor;
          button.innerText = actor + ' x';
          button.classList.add('selected_filter');
          button.addEventListener('click', function () {
            let actorButton = document.getElementById(actor);
            if (actorButton) {
              actorButton.remove();
              // remove actor from search store
              store.commit('search/removeActor', actor);
            }
            if (document.getElementById('selected_actors_container').childNodes.length === 0)
              document.getElementById('actor_separator').style.display = "none";
          });
          document.getElementById('selected_actors_container').appendChild(button);
          document.getElementById('actors_txt').value = '';
          // activate actor SeparatorLine
          document.getElementById('actor_separator').style.display = "block";
        }
      }
      document.getElementById('actors_txt').focus();
    },
    enterActor(event) {
      if (event.key === 'Enter') {
        this.addActor();
      }
    },
    addDirector() {
      const director = document.getElementById('directors_txt').value;

      const store = this.$store;

      if (!(director === '')) {
        let isNewDirector = true;
        const selected_directors = document.getElementById('selected_directors_container').childNodes;
        for (let i = 0; i < selected_directors.length; i++)
          if (selected_directors[i].textContent === director + ' x')
            isNewDirector = false;

        if (isNewDirector) {
          // add director to de search store
          store.commit('search/addDirector', director);

          // create a selected actor filter
          let button = document.createElement('button');
          button.id = director;
          button.innerText = director + ' x';
          button.classList.add('selected_filter');
          button.addEventListener('click', function () {
            let directorButton = document.getElementById(director);
            if (directorButton) {
              directorButton.remove();
              // remove director from search store
              store.commit('search/removeDirector', director);
            }
            if (document.getElementById('selected_directors_container').childNodes.length === 0)
              document.getElementById('director_separator').style.display = "none";
          });
          document.getElementById('selected_directors_container').appendChild(button);
          document.getElementById('directors_txt').value = '';
          // activate director SeparatorLine
          document.getElementById('director_separator').style.display = "block";
        }
      }
      document.getElementById('directors_txt').focus();
    },
    enterDirector(event,) {
      if (event.key === 'Enter') {
        this.addDirector();
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@keyframes onClickBorderRadius {
  from {
    border-radius: 3px;
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
    border-radius: 3px;
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

  .txt_filter {
    .add_button {
      border: 2px solid mediumpurple;
      background-color: #151414;
      color: white;
      border-radius: 20px;
      margin-left: 8px;
      width: 15%;
    }

    .selected_container {
      display: flex;
      flex-flow: column;
      justify-content: center;
    }

    .txt_input {
      margin-left: 10px;
      border-radius: 3px;
      width: 70%;
      border: 2px solid mediumpurple;
      background-color: #151414;
      color: white;
    }

    .txt_input:focus {
      animation: onClickBorderRadius 1.5s;
      animation-fill-mode: forwards;
    }

    .txt_input:not(:focus) {
      animation: onClickBorderRadiusOut 1.5s;
      animation-fill-mode: forwards;
    }

    .add_button:hover {
      background-color: #737373;
    }

    .add_button:active {
      animation: blink 0.05s;
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
