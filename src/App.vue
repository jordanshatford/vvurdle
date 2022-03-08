<template>
  <div class="app">
    <header class="app__header">VVurdle</header>
    <game-board></game-board>
  </div>
</template>

<script setup lang="ts">
import GameBoard from "@/components/GameBoard.vue"
</script>

<style lang="scss">
@import "./src/scss/variables";
body {
  background-color: $color-background;
  padding: 0;
  margin: 0;
  min-height: 100vh;
  height: 100%;
}
.app {
  &__header {
    width: 100%;
    display: flex;
    justify-content: center;
    padding-top: 1rem;
    padding-bottom: 1rem;
    color: $color-text;
    font-size: 3rem;
    font-weight: bold;
  }
}
</style>
