<template>
  <header>VVurdle</header>
  <game-keyboard :keyboard="keyboard" @keypress="handlePress" />
</template>

<script setup lang="ts">
import { ref } from "vue"
import GameKeyboard from "./components/GameKeyboard.vue"
import { type KeyInfo, ValidKey, KeyState } from "@/utils/types"

const x = [
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

const keyboard = ref<KeyInfo[]>(
  x.map((v) => {
    return { key: v, state: KeyState.UNKNOWN }
  })
)

function handlePress(key: ValidKey) {
  const index = keyboard.value.findIndex((k: KeyInfo) => k.key === key)
  keyboard.value[index].state = KeyState.ABSENT
}
</script>
