<template>
  <div class="app">
    <header>VVurdle</header>
    <game />
  </div>
</template>

<script setup lang="ts">
import Game from "@/components/GameBoard.vue"
</script>

<style lang="scss">
@import "./src/assets/scss/variables";
body {
  background-color: $color-background;
  padding: 0;
  margin: 0;
  min-height: 100vh;
  height: 100%;
}
</style>
