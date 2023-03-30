<template>
  <input id="resetButton" class="reset_button" type="button" value="Reset Filters">
</template>

<script >
export default  {
}

</script>

<style scoped>
  @keyframes hoverShadow {
    from { background-color: white; color: black; }
    to { border: 2px solid rebeccapurple; background-color: #151414; color: white;}
  }

  @keyframes blink {
    from { opacity: 1; }
    to { opacity: 0; }
  }

  .reset_button {
    justify-self: center;
    align-self: center;
    width: 9rem;
    height: 1.5rem;
    border-radius: 1px;
    background-color: mediumpurple;
    color: white;
    margin: 10px 5px;
    border: 2px solid rebeccapurple;
  }

  .reset_button:hover {
    font-weight: bold;
    animation: hoverShadow 0s;
    animation-fill-mode: forwards;
  }

  .reset_button:active {
    animation: blink 0.5s;
  }

  @media (max-width: 744px) {
    .reset_button {
      min-width: 14rem;
    }
  }
</style>