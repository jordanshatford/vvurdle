import { ValidKey, EvaluationState, type KeyInfo } from "./types"

export function initializeKeyboard(): KeyInfo[] {
  const keys = [
    ValidKey.Q,
    ValidKey.W,
    ValidKey.E,
    ValidKey.R,
    ValidKey.T,
    ValidKey.Y,
    ValidKey.U,
    ValidKey.I,
    ValidKey.O,
    ValidKey.P,
    ValidKey.A,
    ValidKey.S,
    ValidKey.D,
    ValidKey.F,
    ValidKey.G,
    ValidKey.H,
    ValidKey.J,
    ValidKey.K,
    ValidKey.L,
    ValidKey.ENTER,
    ValidKey.Z,
    ValidKey.X,
    ValidKey.C,
    ValidKey.V,
    ValidKey.B,
    ValidKey.N,
    ValidKey.M,
    ValidKey.BACKSPACE,
  ]
  return keys.map((key) => {
    return { key, state: EvaluationState.UNKNOWN }
  })
}

export function initializeBoard(wordLength: number, totalGuesses: number) {
  return [...Array(wordLength * totalGuesses)].map(() => {
    return { value: ValidKey.BLANK, state: EvaluationState.UNKNOWN, wiggle: false }
  })
}
