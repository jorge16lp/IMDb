<template>
  <!--v-if="film.Type==='movie'"-->
  <article v-if="film.Type==='movie'" v-bind:id="film.imdbID" class="film"
           v-on:mouseover="plotTooltip(film.imdbID, film.Plot)"
           v-on:mouseout="quitPlotTooltip(film.imdbID)">
    <img v-bind:id="'poster_'+film.imdbID" v-if="!(film.Poster==='N/A')" class="film_image"
         v-bind:alt="'film image of '+film.Title" v-bind:src="film.Poster">
    <img v-bind:id="'poster_'+film.imdbID" v-if="film.Poster==='N/A'" src="/cover_.jpeg"
         class="film_image" alt="film image">
    <div v-bind:id="'title_'+film.imdbID">
      🍿🍿
      <br>
      {{film.Title}}
    </div>

    <div class="film_plotTooltip" v-bind:id="'plot_'+film.imdbID">
      {{film.Plot}}
    </div>

  </article>
</template>

<script>
export default {
  props: ['film'],
  methods: {
    plotTooltip(film_id, film_plot) {
      document.getElementById('poster_'+film_id).style.display = 'none';
      document.getElementById('title_'+film_id).style.display = 'none';
      document.getElementById('plot_'+film_id).style.display = 'block';

      /*
      let plot_div = document.createElement('div');
      plot_div.id = 'plot_' + film_id;
      plot_div.classList.add('film_plotTooltip');
      plot_div.textContent = film_plot;

      document.getElementById(film_id).appendChild(plot_div);

      plot_div.style.gridRow = '1 / 3';
      plot_div.style.maxWidth = '12rem';
       */
    },
    quitPlotTooltip(film_id) {
      document.getElementById('poster_'+film_id).style.display = 'block';
      document.getElementById('title_'+film_id).style.display = 'block';
      document.getElementById('plot_'+film_id).style.display = 'none';
    }
  }
};
</script>

<style lang="scss" scoped>
.film {
  border-radius: 10px;
  margin: 15px 10px 20px;
  display: grid;
  grid-template: 2fr 3rem / 1fr;
  align-items: center;
  width: 12rem;
  min-width: 10rem;
  min-height: 20rem;

  .film_image {
    width: 170px;
    margin-top: -15px;
    border-radius: 3px;
    justify-self: center;
  }

  div {
    text-align: center;
  }

  .film_plotTooltip {
    display: none;
    grid-row: 1 / 3;
    max-width: 12rem;
  }

}
</style>