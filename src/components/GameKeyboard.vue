<template>
  <section class="gamekeyboard">
    <div class="gamekeyboard__row" v-for="(keyset, index) in keyboardLayout" :key="index">
      <game-keyboard-key v-for="value in keyset" :value="value" @click="handleKeypress" :key="value.key" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted } from "vue"
import GameKeyboardKey from "@/components/GameKeyboardKey.vue"
import { type KeyInfo, ValidKey } from "@/utils/types"

interface Props {
  keyboard: KeyInfo[]
}

const props = defineProps<Props>()

const emits = defineEmits<{
  (e: "keypress", key: ValidKey): void
}>()

onMounted(() => {
  window.addEventListener("keyup", handleKeyupEvent)
})

onUnmounted(() => {
  window.removeEventListener("keyup", handleKeyupEvent)
})

const keyboardLayout = computed(() => {
  return [props.keyboard.slice(0, 10), props.keyboard.slice(10, 19), props.keyboard.slice(19, 29)]
})

function handleKeypress(key: ValidKey) {
  emits("keypress", key)
}

function handleKeyupEvent(event: KeyboardEvent) {
  const key = event.key.toUpperCase()
  // if the key is not valid
  if (!(key in ValidKey)) {
    return
  }
  handleKeypress(key as ValidKey)
}
</script>

<style scoped lang="scss">
@import "./src/assets/scss/variables";
.gamekeyboard {
  margin-top: 1rem;
  &__row {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-bottom: 10px;
    @media only screen and (max-width: $breakpoint-mobile-max-w) {
      gap: 5px;
      margin-bottom: 5px;
    }
  }
}
</style>
