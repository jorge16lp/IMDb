<template>
  <div class="txt_filter">
    <h2>ACTORS</h2>
    <div id="selected_actors_container" class="selected_container"></div>
    <SeparatorLine id="actor_separator"/>
    <input id="actors_txt" placeholder="Search by actor name..." type="text" class="txt_input"
           v-on:keydown="enterActor"/>
    <button class="add_button" @click="addActor">+</button>
  </div>
</template>

<script>
import SeparatorLine from "@/components/SeparatorLine.vue";

export default {
  components: {
    SeparatorLine
  },
  methods: {
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
    }
  }
};
</script>

<style lang="scss" scoped>

</style>