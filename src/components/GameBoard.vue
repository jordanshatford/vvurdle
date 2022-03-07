<template>
  <game-grid :board="board" :wordLength="wordLength" />
  <game-keyboard :keyboard="keyboard" @keypress="handleKeyPress" />
</template>

<script setup lang="ts">
import { ref, watch } from "vue"
import GameGrid from "@/components/GameGrid.vue"
import GameKeyboard from "@/components/GameKeyboard.vue"
import { initializeBoard } from "@/utils/funcs"
import { ValidKey, EvaluationState, type CellInfo, type GameResult, GameStatus } from "@/utils/types"
import { useKeyboard } from "@/composables/use-keyboard"

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
const currentRow = ref<number>(0)
const board = ref<CellInfo[]>(initializeBoard(wordLength, totalGuesses))

const { keyboard, updateKeyState } = useKeyboard()

function handleKeyPress(key: ValidKey) {
  if (props.gameOver) {
    return
  }
  const nextEmptySlot = board.value.findIndex((cell) => cell.value === ValidKey.BLANK)
  switch (key) {
    case ValidKey.BACKSPACE:
      return handleBackspace(nextEmptySlot)
    case ValidKey.ENTER:
      return handleEnter(nextEmptySlot)
    default: {
      const isCurrentRow = Math.floor(nextEmptySlot / wordLength) === currentRow.value
      if (isCurrentRow) {
        board.value[nextEmptySlot].value = key
      }
    }
  }
}

function handleBackspace(nextEmptySlot: number) {
  if (nextEmptySlot === -1) {
    // All board cells are filled so make last cell blank
    return (board.value[board.value.length - 1].value = ValidKey.BLANK)
  }
  const isCurrentRow = Math.floor((nextEmptySlot - 1) / wordLength) === currentRow.value
  if (isCurrentRow) {
    const lastNonEmptyCell = board.value.filter((cell) => cell.value !== ValidKey.BLANK).length - 1
    board.value[lastNonEmptyCell].value = ValidKey.BLANK
  }
}

function getInputtedWord(row: number) {
  let word = ""
  const startIndex = row * wordLength
  for (let i = startIndex; i < startIndex + wordLength; i++) {
    word += board.value[i].value
  }
  return word
}

function handleEnter(nextEmptySlot: number) {
  const index = nextEmptySlot === -1 ? wordLength * totalGuesses : nextEmptySlot
  const row = Math.floor((index - 1) / wordLength)
  const isCurrentRow = row === currentRow.value
  const rowComplete = index % wordLength === 0
  if (isCurrentRow && rowComplete) {
    let inputWord = getInputtedWord(row)
    if (validWords.includes(inputWord)) {
      currentRow.value++
      evaluateInputtedWord(inputWord)
    } else {
      errors.value.unshift("Not in word list")
    }
  } else {
    errors.value.unshift("Not enough letters")
  }
}

function evaluateInputtedWord(input: string) {
  const nextToEvaluateIndex = board.value.findIndex((cell) => cell.state === EvaluationState.UNKNOWN)
  handleBoardEvaluation(input, nextToEvaluateIndex)
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
    board.value[index + lIndex].state = evaluation
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
      board.value[i].wiggle = true
    }
    setTimeout(() => {
      errors.value.pop()
      for (let i = startIndex; i < endIndex; i++) {
        board.value[i].wiggle = false
      }
    }, 1500)
  }
)

function getScore(row: number, totalGuesses: number) {
  const totalScore = 100
  return 100 - (totalScore / (totalGuesses - 1)) * (row - 1)
}
</script>
