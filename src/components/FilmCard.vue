<template>
  <!--v-if="film.Type==='movie'"-->
  <article v-bind:id="film.imdbID" class="film"> <!-- añadir el onclick aqui -->
    <img v-if="!(film.Poster==='N/A')" class="film_image" v-bind:alt="'film image of '+film.Title"
         v-bind:src="film.Poster">
    <img v-if="film.Poster==='N/A'" src="/cover_.jpeg" class="film_image" alt="film image">
    <div>
      🍿🍿
      <br>
      {{film.Title}}
    </div>

    <!--
    <div>🍿film name🍿</div>
    <div>✨description on tooltip✨</div>
    -->
  </article>
</template>

<script>
export default {
  props: ['film'],
  mounted() {
    // aqui añadir el codigo para meterle tooltip a las imagenes
    /*
        // Obtén el elemento enlace
        var miEnlace = document.getElementById('miEnlace');

        // Agrega un evento 'mouseover' al enlace
        miEnlace.addEventListener('mouseover', function(event) {
        // Crea un elemento de tooltip
        var tooltip = document.createElement('div');
        tooltip.textContent = '¡Este es un tooltip!'; // Contenido del tooltip
        tooltip.className = 'tooltip'; // Clase CSS para dar estilo al tooltip

        // Posiciona el tooltip debajo del enlace
        var rect = miEnlace.getBoundingClientRect();
        tooltip.style.left = rect.left + 'px';
        tooltip.style.top = rect.bottom + 'px';

        // Agrega el tooltip al cuerpo del documento
        document.body.appendChild(tooltip);

        // Detiene la propagación del evento para evitar conflictos con otros eventos
        event.stopPropagation();
        });

        // Agrega un evento 'mouseout' al enlace
        miEnlace.addEventListener('mouseout', function() {
        // Remueve el tooltip del cuerpo del documento
        var tooltip = document.querySelector('.tooltip');
        if (tooltip) {
          tooltip.parentNode.removeChild(tooltip);
        }
        });

     */
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
}
</style>