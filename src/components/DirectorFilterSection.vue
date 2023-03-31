<template>
  <div class="txt_filter">
    <h2>DIRECTORS</h2>
    <div id="selected_directors_container" class="selected_container"></div>
    <SeparatorLine id="director_separator"/>
    <input id="directors_txt" placeholder="Search by director name..." type="text" class="txt_input"
           v-on:keydown="enterDirector"/>
    <button class="add_button" @click="addDirector">+</button>
  </div>
</template>

<script>
import SeparatorLine from "@/components/SeparatorLine.vue";

export default {
  components: {
    SeparatorLine
  },
  methods: {
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

</style>