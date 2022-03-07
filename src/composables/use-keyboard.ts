import { ref } from "vue"
import { EvaluationState, ValidKey, type KeyInfo } from "@/utils/types"

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

export function useKeyboard() {
  const keyboard = ref(initializeKeyboard())

  function updateKeyState(key: ValidKey, state: EvaluationState) {
    const k = keyboard.value.find((value) => value.key === key)
    if (!k) {
      return
    }
    if ((state as EvaluationState) === EvaluationState.MULTIPLE) {
      k.state = EvaluationState.CORRECT
    }
    k.state = state
  }

  function reset() {
    keyboard.value = initializeKeyboard()
  }

  return {
    keyboard,
    updateKeyState,
    reset,
  }
}
