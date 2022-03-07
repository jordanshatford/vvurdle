<template>
  <div class="app">
    <header>VVurdle</header>
    <game-board :gameOver="gameOver" @gameover="handle" />
  </div>
</template>

<script setup lang="ts">
import GameBoard from "@/components/GameBoard.vue"
import { ref } from "vue"

const gameOver = ref<boolean>(false)

function handle(x: any) {
  gameOver.value = true
  console.log({ x })
}
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
