<template>
  <div class="gamekeyboard__key" :class="classObj" @click="emits('click', value.key)">
    <ph-backspace v-if="value.key === ValidKey.BACKSPACE" :size="24" weight="fill"></ph-backspace>
    <span v-else>{{ value.key }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { PhBackspace } from "phosphor-vue"
import { type KeyInfo, ValidKey } from "@/utils/types"

interface Props {
  value: KeyInfo
}

const props = defineProps<Props>()

const emits = defineEmits<{
  (e: "click", key: ValidKey): void
}>()

const classObj = computed(() => {
  if ([ValidKey.ENTER, ValidKey.BACKSPACE].includes(props.value.key)) {
    return "gamekeyboard__key--wide"
  } else {
    return `gamekeyboard__key--${props.value.state}`
  }
})
</script>

<style scoped lang="scss">
.gamekeyboard__key {
  cursor: pointer;
  user-select: none;
  color: var(--text-color);
  background-color: var(--bg-accent-color);
  width: 40px;
  height: 60px;
  border-radius: 5px;
  display: grid;
  place-items: center;
  &:hover {
    opacity: 0.75;
  }
  @media only screen and (max-width: 600px) {
    width: 30px;
    height: 45px;
  }
  &--wide {
    width: 80px;
    @media only screen and (max-width: 600px) {
      width: 60px;
      font-size: 0.7rem;
    }
  }
  &--absent {
    background-color: var(--absent-color);
  }
  &--present {
    background-color: var(--present-color);
  }
  &--correct {
    background-color: var(--correct-color);
  }
}
</style>
