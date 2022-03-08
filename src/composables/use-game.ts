import { ref, watch } from "vue"
import { useKeyboard } from "@/composables/use-keyboard";
import { useBoard } from "@/composables/use-board";
import { GameStatus, type ValidKey } from "@/utils/types";
import { useWordle } from "./use-wordle";

export function useGame() {
  const { word, numGuesses, isValid, isCorrect, getScore, getEvaluations, reset: resetWordle } = useWordle()
  const { keyboard, updateKeyState, reset: resetKeyboard } = useKeyboard()
  const {
    board,
    currentRow,
    currentRowComplete,
    nextEmptyCell,
    nextUnevaluatedCell,
    inputtedWord,
    updateCell,
    clearLastCellWithLetter,
    reset: resetBoard,
  } = useBoard({
    width: word.value.length,
    length: numGuesses.value,
  })

  const gameOver = ref<boolean>(false)
  const cheated = ref<boolean>(false)
  const errors = ref<string[]>([])

  function handleBackspace() {
    clearLastCellWithLetter()
  }

  function handleSubmit() {
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

  function handleKeypress(key: ValidKey) {
    updateCell(nextEmptyCell.value, { value: key })
  }

  function reset() {
    gameOver.value = false
    cheated.value = false
    resetKeyboard()
    resetBoard()
    resetWordle()
  }


  function evaluateInputtedWord(input: string) {
    const index = nextUnevaluatedCell.value
    const evaluations = getEvaluations(input)
    evaluations.forEach((evaluation, letterIndex) => {
      updateCell(index + letterIndex, { state: evaluation })
      updateKeyState(input[letterIndex] as ValidKey, evaluation)
    })
    if (isCorrect(input)) {
      console.log("gameover", {
        status: GameStatus.WIN,
        word: word.value,
        guesses: currentRow.value + 1,
        score: getScore(currentRow.value),
        cheated: cheated.value
      })
      return
    }
    if (currentRow.value === numGuesses.value - 1) {
      console.log("gameover", {
        status: GameStatus.LOSS,
        word: word.value,
        guesses: currentRow.value + 1,
        score: 0,
        cheated: cheated.value
      })
    }
  }

  watch(
    () => [...errors.value],
    (oldValue, newValue) => {
      if (oldValue.length < newValue.length) {
        return
      }
      const startIndex = currentRow.value * word.value.length
      const endIndex = startIndex + word.value.length
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

  return {
    word,
    gameOver,
    cheated,
    errors,
    keyboard,
    board,
    handleBackspace,
    handleKeypress,
    handleSubmit,
    reset,
  }
}
