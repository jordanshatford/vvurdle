<template>
  <game-header @reset="reset"></game-header>
  <game-grid :board="board.value" :width="board.width"></game-grid>
  <game-keyboard
    :keyboard="keyboard"
    :disabled="gameOver"
    @backspace="handleBackspace"
    @enter="handleSubmit"
    @keypress="handleKeypress"
  ></game-keyboard>
</template>

<script setup lang="ts">
import { ref } from "vue"
import GameGrid from "@/components/GameGrid.vue"
import GameKeyboard from "@/components/GameKeyboard.vue"
import GameHeader from "@/components/GameHeader.vue"
import { useGame } from "@/composables/use-game"

const { gameOver, keyboard, board, handleBackspace, handleKeypress, handleSubmit, reset } = useGame()
</script>
