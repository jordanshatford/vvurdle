import { EvaluationState } from "@/utils/types"
import { computed } from "vue"

export function useWordle(length = 5) {
  const word = "VALVE"
  const validWords = [word, "PIZZA", "VALUE"]

  const numGuesses = computed(() => {
    return word.length + 1
  })

  function isValid(w: string) {
    return validWords.includes(w)
  }

  function isCorrect(w: string) {
    return w === word
  }

  function getScore(guessesMade: number) {
    return 100 - (100 / (numGuesses.value - 1)) * guessesMade
  }

  function getEvaluations(inputWord: string): EvaluationState[] {
    const inputArray = inputWord.split("")
    const wordArray = word.split("")
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

  return {
    word,
    numGuesses,
    isValid,
    isCorrect,
    getScore,
    getEvaluations,
  }
}
