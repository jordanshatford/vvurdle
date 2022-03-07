<template>
  <game-grid :board="board.value" :width="board.width" />
  <game-keyboard :keyboard="keyboard" @keypress="handleKeyPress" />
</template>

<script setup lang="ts">
import { ref, watch } from "vue"
import GameGrid from "@/components/GameGrid.vue"
import GameKeyboard from "@/components/GameKeyboard.vue"
import { ValidKey, EvaluationState, type GameResult, GameStatus } from "@/utils/types"
import { useKeyboard } from "@/composables/use-keyboard"
import { useBoard } from "@/composables/use-board"

interface Props {
  gameOver: boolean
}

const props = defineProps<Props>()

const emits = defineEmits<{
  (e: "gameover", result: GameResult): void
}>()

const errors = ref<string[]>([])
const rightWOrd = "VALVE"
const validWords = [rightWOrd, "PIZZA", "VALUE"]
const wordLength = rightWOrd.length
const totalGuesses = rightWOrd.length + 1
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
  width: wordLength,
  length: totalGuesses,
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
    if (validWords.includes(inputtedWord.value)) {
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
  handleBoardEvaluation(input, nextUnevaluatedCell.value)
  const isCorrect = input === rightWOrd
  if (isCorrect) {
    emits("gameover", {
      status: GameStatus.WIN,
      word: rightWOrd,
      guesses: currentRow.value,
      score: getScore(currentRow.value, totalGuesses),
    })
    return
  }
  if (currentRow.value === totalGuesses) {
    emits("gameover", {
      status: GameStatus.LOSS,
      word: rightWOrd,
      guesses: currentRow.value,
      score: getScore(currentRow.value, totalGuesses),
    })
  }
}

function handleBoardEvaluation(input: string, index: number) {
  const inputArray = input.split("")
  const wordArray = rightWOrd.split("")
  let evaluation = EvaluationState.UNKNOWN
  inputArray.forEach((letter, lIndex) => {
    if (letter === wordArray[lIndex]) {
      evaluation = EvaluationState.CORRECT
      const multiple = wordArray.filter((v) => v === letter)
      if (multiple.length > 1) {
        const [multipleLetter] = multiple
        const guess = inputArray.filter((v) => v === multipleLetter)
        if (guess.length !== multiple.length) {
          if (guess.length <= multiple.length) {
            const [guessLetter] = guess
            inputArray.forEach((letter) => {
              if (letter === guessLetter) {
                evaluation = EvaluationState.MULTIPLE
              }
            })
          }
        }
      }
    } else if (wordArray.includes(letter)) {
      evaluation = EvaluationState.PRESENT
    } else {
      evaluation = EvaluationState.ABSENT
    }
    updateCell(index + lIndex, { state: evaluation })
    updateKeyState(letter as ValidKey, evaluation)
  })
}

watch(
  () => [...errors.value],
  (oldValue, newValue) => {
    if (oldValue.length < newValue.length) {
      return
    }
    const startIndex = currentRow.value * wordLength
    const endIndex = startIndex + wordLength
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

function getScore(row: number, totalGuesses: number) {
  const totalScore = 100
  return 100 - (totalScore / (totalGuesses - 1)) * row
}
</script>
