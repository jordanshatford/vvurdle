<template>
  <div class="app">
    <header>VVurdle</header>
    <game-board :gameOver="gameOver" @gameover="handle" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import GameBoard from "@/components/GameBoard.vue"
import type { GameResult } from "./utils/types"

const gameOver = ref<boolean>(false)

function handle(result: GameResult) {
  gameOver.value = true
  console.log({ result })
}
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
