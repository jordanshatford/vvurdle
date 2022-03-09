<template>
  <transition name="fade-modal">
    <v-modal v-if="gameOver" @close="gameOver = false">
      <game-result :result="result" @playagain="reset"></game-result>
    </v-modal>
  </transition>
  <transition name="fade-modal">
    <v-modal v-if="showHelpModal" @close="showHelpModal = false" title="How to Play:">
      <game-help></game-help>
    </v-modal>
  </transition>
  <transition name="fade-modal">
    <v-modal v-if="showSettingsModal" @close="showSettingsModal = false" title="Settings:">
      <p class="gameboard__text">Reveal the current word?</p>
      <blurred-word @unblur="cheated = true">{{ word }}</blurred-word>
      <p class="gameboard__text">Word length:</p>
      <select name="wordlengths" v-model="wordLength">
        <option v-for="(l, index) of availableLengths" :value="l" :key="index">
          {{ l }}
        </option>
      </select>
    </v-modal>
  </transition>
  <game-header
    @openhelp="showHelpModal = true"
    @openstats="result ? (gameOver = true) : null"
    @opensettings="showSettingsModal = true"
    @reset="reset"
  ></game-header>
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
import GameHelp from "@/components/GameHelp.vue"
import GameResult from "@/components/GameResult.vue"
import BlurredWord from "@/components/BlurredWord.vue"
import VModal from "@/components/VModal.vue"
import { useGame } from "@/composables/use-game"

const wordLength = ref(5)

const {
  word,
  gameOver,
  result,
  cheated,
  availableLengths,
  keyboard,
  board,
  handleBackspace,
  handleKeypress,
  handleSubmit,
  reset,
} = useGame(wordLength)

const showSettingsModal = ref<boolean>(false)
const showHelpModal = ref<boolean>(false)
</script>

<style scoped lang="scss">
.gameboard {
  &__text {
    color: var(--text-color);
  }
}
.fade-modal-enter-active,
.fade-modal-leave-active {
  transition: all 0.3s ease-in-out;
}
.fade-modal-enter-from,
.fade-modal-leave-to {
  opacity: 0;
}
</style>
