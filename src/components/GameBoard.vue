<template>
  <transition name="fade-modal">
    <VModal v-if="showResultModal" @close="showResultModal = false">
      <GameResult :result="game.result" @playagain="playAgain" />
    </VModal>
  </transition>
  <transition name="fade-modal">
    <VModal v-if="showHelpModal" @close="showHelpModal = false" title="How to Play:">
      <GameHelp />
    </VModal>
  </transition>
  <transition name="fade-modal">
    <VModal v-if="showSettingsModal" @close="showSettingsModal = false" title="Settings:">
      <GameSettings
        :word="game.word"
        v-model:length="game.length"
        :availableLengths="game.availableLengths"
        @checkedword="game.cheated = true"
      />
    </VModal>
  </transition>
  <GameErrors :errors="game.errors" />
  <GameHeader
    @openhelp="showHelpModal = true"
    @openstats="showResultModal = true"
    @opensettings="showSettingsModal = true"
    @reset="game.reset"
  />
  <GameGrid :board="game.board" />
  <GameKeyboard
    :keyboard="game.keyboard"
    :disabled="game.over"
    @backspace="game.handleBackspace"
    @enter="game.handleSubmit"
    @keypress="game.handleKeypress"
  />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import GameGrid from '@/components/GameGrid.vue'
import GameKeyboard from '@/components/GameKeyboard.vue'
import GameHeader from '@/components/GameHeader.vue'
import GameHelp from '@/components/GameHelp.vue'
import GameResult from '@/components/GameResult.vue'
import GameSettings from '@/components/GameSettings.vue'
import GameErrors from '@/components/GameErrors.vue'
import VModal from '@/components/VModal.vue'
import { useGame } from '@/stores/game'

const game = useGame()
const showResultModal = ref<boolean>(false)
const showSettingsModal = ref<boolean>(false)
const showHelpModal = ref<boolean>(false)

function playAgain() {
  showResultModal.value = false
  game.reset()
}

watch(
  () => game.over,
  (newVal, oldVal) => {
    if (newVal && !oldVal) {
      showResultModal.value = true
    }
  }
)
</script>

<style scoped lang="scss">
.fade-modal-enter-active,
.fade-modal-leave-active {
  transition: all 0.3s ease-in-out;
}
.fade-modal-enter-from,
.fade-modal-leave-to {
  opacity: 0;
}
</style>
