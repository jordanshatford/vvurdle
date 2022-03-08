import { EvaluationState } from "@/utils/types"
import { computed, ref } from "vue"

function getWord(length: number) {
  const word = "VALVE"
  return word
}

function getValidWords(length: number) {
  const validWords = ["VALVE", "PIZZA", "VALUE"]
  return validWords
}

export function useWordle(len = 5) {
  const length = ref(len)
  const word = ref(getWord(length.value))
  const validWords = ref(getValidWords(length.value))

  const numGuesses = computed(() => {
    return word.value.length + 1
  })

  function isValid(w: string) {
    return validWords.value.includes(w)
  }

  function isCorrect(w: string) {
    return w === word.value
  }

  function getScore(guessesMade: number) {
    return 100 - (100 / (numGuesses.value - 1)) * guessesMade
  }

  function getEvaluations(inputWord: string): EvaluationState[] {
    const inputArray = inputWord.split("")
    const wordArray = word.value.split("")
    const evaluations: EvaluationState[] = []
    inputArray.forEach((letter, lIndex) => {
      let evaluation = EvaluationState.UNKNOWN
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
      evaluations.push(evaluation)
    })
    return evaluations
  }

  function reset() {
    word.value = getWord(length.value)
    validWords.value = getValidWords(length.value)
  }

  return {
    word,
    numGuesses,
    isValid,
    isCorrect,
    getScore,
    getEvaluations,
    reset,
  }
}
