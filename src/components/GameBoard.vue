<template>
  <game-board :board="board" />
  <game-keyboard :keyboard="keyboard" @keypress="handlePress" />
</template>

<script setup lang="ts">
import GameBoard from "@/components/GameGrid.vue"
import GameKeyboard from "@/components/GameKeyboard.vue"
import { ref } from "vue"
import { initializeKeyboard, initializeBoard } from "@/utils/funcs"
import { type KeyInfo, ValidKey, EvaluationState, type CellInfo } from "@/utils/types"

const board = ref<CellInfo[]>(initializeBoard())
const keyboard = ref<KeyInfo[]>(initializeKeyboard())

const i = ref(0)

function handlePress(key: ValidKey) {
  const index = keyboard.value.findIndex((k: KeyInfo) => k.key === key)
  keyboard.value[index].state = EvaluationState.ABSENT
  switch (key) {
    case ValidKey.BACKSPACE:
      board.value[i.value].value = ""
      i.value = i.value - 1
      if (i.value < 0) {
        i.value = 0
      }

      return
    case ValidKey.ENTER:
      return
    default:
      board.value[i.value].value = key
      i.value = i.value + 1
      if (i.value >= board.value.length - 1) {
        i.value = board.value.length - 1
      }
      return
  }
}
</script>
