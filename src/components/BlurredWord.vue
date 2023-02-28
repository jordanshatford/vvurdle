<template>
  <div class="blurredword">
    <p :class="['blurredword__text', { blurredword__blurrytext: blurred }]">
      <slot></slot>
    </p>
    <EyeIcon v-if="blurred" @click="handleUnblur()" class="blurredword__icon" />
    <EyeSlashIcon v-else @click="blurred = true" class="blurredword__icon" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/outline'

const emits = defineEmits<{
  (e: 'unblur'): void
}>()

const blurred = ref(true)

function handleUnblur() {
  blurred.value = false
  emits('unblur')
}
</script>

<style scoped lang="scss">
.blurredword {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--text-color);
  &__text {
    margin: 0;
    font-size: 1rem;
  }
  &__blurrytext {
    filter: blur(10px);
  }
  &__icon {
    width: 25px;
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
