<template>
  <main class="gameboard">
    <section class="gameboard__content" :style="style">
      <game-board-cell
        v-for="(cell, index) in board"
        :value="cell.value"
        :state="cell.state"
        :wiggle="cell.wiggle"
        :key="index"
      ></game-board-cell>
    </section>
  </main>
</template>

<script setup lang="ts">
import { computed } from "vue"
import GameBoardCell from "@/components/GameGridCell.vue"
import type { CellInfo } from "@/utils/types"

interface Props {
  board: CellInfo[]
  width: number
}

const props = defineProps<Props>()

const style = computed(() => {
  return {
    gridTemplateColumns: `repeat(${props.width}, 1fr)`,
  }
})
</script>

<style lang="scss" scoped>
.gameboard {
  display: flex;
  justify-content: center;
  &__content {
    display: grid;
    gap: 10px;
  }
}
</style>
