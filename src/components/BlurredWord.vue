<template>
  <div class="blurredword">
    <p :class="['blurredword__text', { blurredword__blurrytext: blurred }]">
      <slot></slot>
    </p>
    <ph-eye v-if="blurred" @click="handleUnblur()" :size="28" class="blurredword__icon"></ph-eye>
    <ph-eye-slash v-else @click="blurred = true" :size="28" class="blurredword__icon"></ph-eye-slash>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { PhEye, PhEyeSlash } from "phosphor-vue"

const emits = defineEmits<{
  (e: "unblur"): void
}>()

const blurred = ref(true)

function handleUnblur() {
  blurred.value = false
  emits("unblur")
}
</script>

<style scoped lang="scss">
.blurredword {
  padding-bottom: 1rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--text-color);
  &__text {
    margin: 0;
    font-size: 2rem;
  }
  &__blurrytext {
    filter: blur(10px);
  }
  &__icon {
    color: var(--text-accent-color);
  }
  svg {
    padding-left: 0.5rem;
    cursor: pointer;
    &:hover {
      opacity: 0.75;
    }
  }
}
</style>
