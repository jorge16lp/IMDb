<template>
  <fieldset>
    <legend>select filters to use</legend>
    <button id="genre_button" class="selection_filter" @click="selectFilter('genre_button','gender_filter')">
      genre
    </button>
    <button id="year_button" class="selection_filter" @click="selectFilter('year_button','releaseYear_filter')">
      release year
    </button>
    <button id="duration_button" class="selection_filter" @click="selectFilter('duration_button','duration_filter')">
      duration
    </button>
    <button id="actor_button" class="selection_filter" @click="selectFilter('actor_button','actor_filter')">
      actor
    </button>
    <button id="director_button" class="selection_filter" @click="selectFilter('director_button','director_filter')">
      director
    </button>
  </fieldset>
</template>

<script>

export default {
  methods: {
    selectFilter(button, filter) {
      if (document.getElementById(filter).style.display === 'none') {
        document.getElementById(filter).style.display = 'block';
        document.getElementById(button).style.backgroundColor = '#151414';
        document.getElementById(button).style.color = 'white';
      } else {
        document.getElementById(filter).style.display = 'none';
        document.getElementById(button).style.backgroundColor = 'mediumpurple';
        document.getElementById(button).style.color = 'black';
      }
    }
  }
};
</script>

<style lang="scss" scoped>
fieldset {
  border-color: rebeccapurple;
  display: flex;
  flex-direction: column;
  border-radius: 5px;

  .selection_filter {
    margin: 0 30px 4px;
    background-color: mediumpurple;
    color: #151414;
    font-weight: 600;
    padding: 0.3rem 1.5rem;
    border-radius: 2px;
    border: 2px solid mediumpurple;
    width: 75%;
  }
}

</style>