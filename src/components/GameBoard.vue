<template>
  <transition name="fade-modal">
    <v-modal v-if="showResultModal" @close="showResultModal = false">
      <game-result :result="game.result" @playagain="playAgain"></game-result>
    </v-modal>
  </transition>
  <transition name="fade-modal">
    <v-modal v-if="showHelpModal" @close="showHelpModal = false" title="How to Play:">
      <game-help></game-help>
    </v-modal>
  </transition>
  <transition name="fade-modal">
    <v-modal v-if="showSettingsModal" @close="showSettingsModal = false" title="Settings:">
      <game-settings
        :word="game.word"
        v-model:length="game.length"
        :availableLengths="game.availableLengths"
        @checkedword="game.cheated = true"
      ></game-settings>
    </v-modal>
  </transition>
  <game-errors :errors="game.errors"></game-errors>
  <game-header
    @openhelp="showHelpModal = true"
    @openstats="showResultModal = true"
    @opensettings="showSettingsModal = true"
    @reset="game.reset"
  ></game-header>
  <game-grid :board="game.board"></game-grid>
  <game-keyboard
    :keyboard="game.keyboard"
    :disabled="game.over"
    @backspace="game.handleBackspace"
    @enter="game.handleSubmit"
    @keypress="game.handleKeypress"
  ></game-keyboard>
</template>

<script setup lang="ts">
import { ref, watch } from "vue"
import GameGrid from "@/components/GameGrid.vue"
import GameKeyboard from "@/components/GameKeyboard.vue"
import GameHeader from "@/components/GameHeader.vue"
import GameHelp from "@/components/GameHelp.vue"
import GameResult from "@/components/GameResult.vue"
import GameSettings from "@/components/GameSettings.vue"
import GameErrors from "@/components/GameErrors.vue"
import VModal from "@/components/VModal.vue"
import { useGame } from "@/stores/game"

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
