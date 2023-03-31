<template>
  <header class="header">
    <button id="menu_toggle" class="menu_toggle" @click="toggleMenu">Menu</button>
    <SearchInput/>
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
      if (document.getElementById('menu').style.display === 'none') {
        document.getElementById('menu').style.display = 'block';
        document.getElementById('main').style.gridColumn = 'span 2';
        document.getElementById('menu_toggle').textContent = 'Close Menu';
      } else {
        document.getElementById('menu').style.display = 'none';
        document.getElementById('main').style.gridColumn = 'span 3';
        document.getElementById('menu_toggle').textContent = 'Menu';
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  background-color: black;
  grid-column: span 3;
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
  align-items: center;

  .menu_toggle {
    width: 60%;
    height: 50%;
    font-size: 23px;
    border-radius: 3px;
    justify-self: center;
    background-color: black;
    color: white;
    border: 2px solid #333;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .logo {
    width: 10rem;
    height: 5rem;
    border-radius: 30px;
    justify-self: center;
  }
}
</style>