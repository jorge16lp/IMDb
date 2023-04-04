<template>
  <footer>
    <p>
      Frontend made by Jorge López - Academy Frontend Software at Empathy.co
      <br>
      Backend made by Tania Bajo & Raúl Álvarez - Academy Backend Software at Empathy.co
    </p>
  </footer>
</template>

<script>

export default {};
</script>

<style lang="scss" scoped>
footer {
  background-color: black;
  grid-column: span 3;
  display: flex;
  justify-content: center;
  border-top: 1px solid rebeccapurple;
  margin-bottom: 15px;
  text-align: center;
}

@media (max-width: 600px) {
  footer {
    grid-row: 4;
  }
}
</style>