import { ValidKey, EvaluationState } from "./types"

export function initializeBoard(wordLength: number, totalGuesses: number) {
  return [...Array(wordLength * totalGuesses)].map(() => {
    return { value: ValidKey.BLANK, state: EvaluationState.UNKNOWN, wiggle: false }
  })
}
