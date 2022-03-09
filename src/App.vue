<template>
  <div class="app">
    <app-header></app-header>
    <game-board></game-board>
  </div>
  <app-footer></app-footer>
</template>

<script setup lang="ts">
import AppHeader from "@/components/AppHeader.vue"
import AppFooter from "@/components/AppFooter.vue"
import GameBoard from "@/components/GameBoard.vue"
</script>

<style lang="scss">
:root {
  --text-color: #ffffff;
  --text-accent-color: #818384;
  --bg-color: #22272d;
  --bg-accent-color: #818384;
  --border-color: #444c56;
  --bg-transparent-color: rgba(#141516, 0.75);
  --shadow-color: 5px 5px 5px rgba(#0f0f0f21, 0.25);
  --absent-color: #3a3a3c;
  --present-color: #b59f3b;
  --correct-color: #538d4e;
}
body {
  background-color: var(--bg-color);
  padding: 0;
  margin: 0;
  min-height: 100vh;
  height: 100%;
}
</style>
