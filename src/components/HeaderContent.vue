<template>
  <button id="menu_toggle" class="menu_toggle" @click="toggleMenu">
    <span class="hamburger">&#9776;</span> Menu
  </button>
  <header id="header" class="header">
    <SearchInput id="search_input"/>
    <img src="/logo.png" class="logo" alt="IMDb logo">
  </header>
</template>

<script>
import SearchInput from '@/components/SearchInput.vue';

export default {
  components: {
    SearchInput
  },
  methods: {
    toggleMenu() {
      document.getElementById('menu').style.display = 'flex';
      document.getElementById('menu').style.flexFlow = 'column';
      document.getElementById('menu').style.alignContent = 'center';
      //document.getElementById('menu').style.position = 'absolute';
      //document.getElementById('menu').style.zIndex = '9999';

      document.getElementById('menu').style.gridRow = '1/3';
      document.getElementById('main').style.gridColumn = 'span 2';
      document.getElementById('menu_toggle').style.display = 'none';
      document.getElementById('header').style.gridColumn = '2/4';

      document.getElementById('gender_filter').style.display = 'none';
      document.getElementById('releaseYear_filter').style.display = 'none';
      document.getElementById('actor_filter').style.display = 'none';
      document.getElementById('director_filter').style.display = 'none';
    }
  }
};
</script>

<style lang="scss" scoped>
.menu_toggle {
  grid-column: 1;
  align-self: center;
  margin-top: 15px;
  width: 60%;
  height: 50%;
  font-size: 23px;
  border-radius: 3px;
  justify-self: center;
  background-color: black;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0;
  /*
  border: 2px solid #333;
   */

  .hamburger {
    font-size: 30px;
    margin-bottom: 10px;
    margin-right: 5px;
  }

}

.header {
  background-color: black;
  grid-column: span 2;
  display: grid;
  grid-template-columns: 2fr 1fr;
  align-items: center;
}

.menu_toggle:hover {
  color: mediumpurple;
  /*
  not sure about button design onHover

  font-weight: 600;
  box-shadow: 0 2px 1px 1px mediumpurple;
   */
}

.logo {
  width: 10rem;
  height: 5rem;
  border-radius: 30px;
  justify-self: center;
}

</style>