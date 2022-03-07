<template>
  <game-grid :board="board.value" :width="board.width" />
  <game-keyboard :keyboard="keyboard" @keypress="handleKeyPress" />
</template>

<script setup lang="ts">
import { ref, watch } from "vue"
import GameGrid from "@/components/GameGrid.vue"
import GameKeyboard from "@/components/GameKeyboard.vue"
import { ValidKey, type GameResult, GameStatus } from "@/utils/types"
import { useKeyboard } from "@/composables/use-keyboard"
import { useBoard } from "@/composables/use-board"
import { useWordle } from "@/composables/use-wordle"

interface Props {
  gameOver: boolean
}

const props = defineProps<Props>()

const emits = defineEmits<{
  (e: "gameover", result: GameResult): void
}>()

const errors = ref<string[]>([])
const { word, numGuesses, isValid, isCorrect, getScore, getEvaluations } = useWordle()
const {
  board,
  currentRow,
  currentRowComplete,
  nextEmptyCell,
  nextUnevaluatedCell,
  inputtedWord,
  updateCell,
  clearLastCellWithLetter,
} = useBoard({
  width: word.length,
  length: numGuesses.value,
})
const { keyboard, updateKeyState } = useKeyboard()

function handleKeyPress(key: ValidKey) {
  if (props.gameOver) {
    return
  }
  switch (key) {
    case ValidKey.BACKSPACE:
      clearLastCellWithLetter()
      break
    case ValidKey.ENTER:
      handleEnter()
      break
    default:
      updateCell(nextEmptyCell.value, { value: key })
      break
  }
}

function handleEnter() {
  if (currentRowComplete.value) {
    if (isValid(inputtedWord.value)) {
      evaluateInputtedWord(inputtedWord.value)
      currentRow.value++
    } else {
      errors.value.unshift("Not in word list")
      console.log("NOT IN LIST")
    }
  } else {
    errors.value.unshift("Not enough letters")
    console.log("NOT ENOUGH")
  }
}

function evaluateInputtedWord(input: string) {
  const index = nextUnevaluatedCell.value
  const evaluations = getEvaluations(input)
  evaluations.forEach((evaluation, letterIndex) => {
    updateCell(index + letterIndex, { state: evaluation })
    updateKeyState(input[letterIndex] as ValidKey, evaluation)
  })
  if (isCorrect(input)) {
    emits("gameover", {
      status: GameStatus.WIN,
      word: word,
      guesses: currentRow.value,
      score: getScore(currentRow.value),
    })
    return
  }
  if (currentRow.value === numGuesses.value) {
    emits("gameover", {
      status: GameStatus.LOSS,
      word: word,
      guesses: currentRow.value,
      score: 0,
    })
  }
}

watch(
  () => [...errors.value],
  (oldValue, newValue) => {
    if (oldValue.length < newValue.length) {
      return
    }
    const startIndex = currentRow.value * word.length
    const endIndex = startIndex + word.length
    for (let i = startIndex; i < endIndex; i++) {
      updateCell(i, { wiggle: true })
    }
    setTimeout(() => {
      errors.value.pop()
      for (let i = startIndex; i < endIndex; i++) {
        updateCell(i, { wiggle: false })
      }
    }, 1500)
  }
)
</script>
