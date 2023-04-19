<template>
  <!--v-if="film.Type==='movie'"-->
  <article v-bind:id="film.id" class="film">

    <div class="score_circle">
      {{ film.vote_average.toFixed(1) }}
    </div>

    <div v-bind:id="'heart_'+film.id" v-bind:class="['mg_circle', 'heart_'+film.id]" v-on:click="changeHeart(film)">
      &hearts;
    </div>

    <img v-bind:id="'poster_'+film.id" v-if="!(film.poster_path===null)" class="film_image"
         v-bind:alt="'film poster of '+film.title" v-bind:src="'https://image.tmdb.org/t/p/w500'+film.poster_path"
         v-on:load="checkHeartColor(film.id)">
    <img v-bind:id="'poster_'+film.id" v-if="film.poster_path===null" src="/cover_.jpeg"
         class="film_image" alt="film image">

    <div v-bind:id="'score_'+film.id" v-bind:class="['film_score', 'film_score_'+film.id]">

    </div>

    <div v-bind:id="'title_'+film.id">
      {{ film.title }}
    </div>

    <div v-bind:id="'film_buttons_container_'+film.id" class="film_buttons_container">
      <button v-bind:class="['film_button', 'plot']" v-on:click="overviewTooltip(film.id)">
        see plot
      </button>
      <button v-bind:class="['film_button', 'info']">
        <a v-bind:href="'https://www.themoviedb.org/movie/'+film.id">more info</a>
      </button>
    </div>

    <div v-bind:id="'back_'+film.id" class="film_back">
      <div v-bind:id="'overview_'+film.id" class="film_plotTooltip">
        {{ film.overview }}
      </div>
      <button class="film_back_button" v-on:click="quitOverviewTooltip(film.id)">
        ← back
      </button>
    </div>

  </article>
</template>

<script>
export default {
  props: ['film'],
  mounted() {
    let score = this.film.vote_average;
    let films = document.getElementsByClassName('film_score_' + this.film.id);
    for (let j = 0; j < films.length; j++)
      if (films[j].textContent === '')
        for (let i = 1; i <= score / 2; i++)
          films[j].textContent += '⭐';
  },
  methods: {
    overviewTooltip(film_id) {
      document.getElementById('poster_' + film_id).style.display = 'none';
      document.getElementById('title_' + film_id).style.display = 'none';
      document.getElementById('film_buttons_container_' + film_id).style.display = 'none';
      document.getElementById('score_' + film_id).style.display = 'none';

      document.getElementById('back_' + film_id).style.display = 'grid';
      document.getElementById('back_' + film_id).style.gridRow = '1 / 5';
      document.getElementById('back_' + film_id).style.gridTemplateRows = '1fr 1.5rem';
      document.getElementById('back_' + film_id).style.height = '100%';
    },
    quitOverviewTooltip(film_id) {
      document.getElementById('poster_' + film_id).style.display = 'block';
      document.getElementById('title_' + film_id).style.display = 'block';
      document.getElementById('film_buttons_container_' + film_id).style.display = 'block';
      document.getElementById('score_' + film_id).style.display = 'block';
      document.getElementById('back_' + film_id).style.display = 'none';
    },
    changeHeart(film) {
      let films = document.getElementsByClassName('heart_' + film.id);
      if (document.getElementById('heart_' + film.id).style.color === 'white'
          || document.getElementById('heart_' + film.id).style.color === '') {
        for (let i = 0; i < films.length; i++)
          films[i].style.color = 'red';
        this.$store.commit('films/addFavFilm', film);
      } else {
        for (let i = 0; i < films.length; i++)
          films[i].style.color = 'white';
        this.$store.commit('films/removeFavFilm', film);
      }
    },
    checkHeartColor(film_id) {
      const favFilms = this.$store.getters['films/getFavFilms'];
      let films = document.getElementsByClassName('heart_' + film_id);
      for (let i = 0; i < films.length; i++)
        if (!(favFilms.findIndex(f => ('heart_' + f.id) === films[i].id) === -1))
          films[i].style.color = 'red';
    }
  }
};
</script>

<style lang="scss" scoped>
.film {
  border-radius: 10px;
  margin: 15px 10px 20px;
  display: grid;
  grid-template: 2fr 2rem 4rem 1.5rem / 1fr;
  align-items: center;
  width: 12rem;
  min-width: 14rem;
  min-height: 25rem;
  border: 1px solid mediumpurple;
  background-color: rebeccapurple;
  position: relative;

  .score_circle {
    position: absolute;
    margin-bottom: 26rem;
    margin-left: 0.2rem;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: mediumpurple;
    color: #fff;
    text-align: center;
    line-height: 2rem;
  }

  .mg_circle {
    position: absolute;
    margin-bottom: 26rem;
    margin-left: 11.9rem;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: mediumpurple;
    color: white;
    border: none;
    text-align: center;
    line-height: 2rem;
    cursor: pointer;
  }

  .film_image {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    justify-self: center;
  }

  div {
    text-align: center;
  }

  .film_buttons_container {
    border-top: 1px solid mediumpurple;
  }

  .film_button {
    background-color: rebeccapurple;
    border: none;
    color: white;
    width: 50%;
  }

  .film_button:hover {
    cursor: pointer;
  }

  .plot {
    border-right: 0.5px solid mediumpurple;
    border-bottom-left-radius: 10px;
  }

  .info {
    border-left: 0.5px solid mediumpurple;
    border-bottom-right-radius: 10px;

    a {
      color: white;
      text-decoration: none;
    }
  }

  .film_back {
    display: none;
  }

  .film_plotTooltip {
    align-self: center;
  }

  .film_back_button {
    background-color: rebeccapurple;
    color: white;
    border: none;
    border-top: 1px solid mediumpurple;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
    width: 100%;
  }

  .film_back_button:hover {
    cursor: pointer;
  }
}
</style>
