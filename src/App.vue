<template>
  <div class="app">
    <app-header></app-header>
    <game-board></game-board>
  </div>
  <app-footer></app-footer>
</template>

<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import GameBoard from '@/components/GameBoard.vue'
import { useGame, LOCAL_STORAGE_KEY } from '@/stores/game'
import { useStats, LOCAL_STORAGE_KEY as STATS_LOCAL_STORAGE_KEY } from '@/stores/stats'

const game = useGame()
game.initialize()
game.$subscribe(
  (m, state) => {
    const copy = Object.assign({}, state)
    copy.errors = []
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(copy))
  },
  { detached: true }
)
const stats = useStats()
stats.initialize()
stats.$subscribe(
  (m, state) => {
    localStorage.setItem(STATS_LOCAL_STORAGE_KEY, JSON.stringify(state))
  },
  { detached: true }
)
</script>

<style lang="scss">
:root {
  --text-color: #ffffff;
  --text-accent-color: #818384;
  --bg-color: #1c1e20;
  --bg-accent-color: #818384;
  --border-color: #444c56;
  --bg-transparent-color: rgba(#141516, 0.75);
  --shadow-color: 5px 5px 5px rgba(#0f0f0f21, 0.25);
  --absent-color: #3a3a3c;
  --present-color: #b59f3b;
  --correct-color: #538d4e;
  --incorrect-color: #ec5d5d;
}
</style>
