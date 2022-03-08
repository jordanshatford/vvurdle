<template>
  <div class="app">
    <header>VVurdle</header>
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
</style>
