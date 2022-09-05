<template>
  <main class="gameboard">
    <section class="gameboard__content" :style="style">
      <GameBoardCell v-for="(cell, index) in board.state" :value="cell.value" :state="cell.state" :key="index" />
    </section>
  </main>
</template>

<script setup lang="ts">
import { computed } from "vue"
import GameBoardCell from "@/components/GameGridCell.vue"
import type { Board } from "@/utils/board"

export interface Props {
  board: Partial<Board>
}

const props = defineProps<Props>()

const style = computed(() => {
  return {
    gridTemplateColumns: `repeat(${props.board.width}, 1fr)`,
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
