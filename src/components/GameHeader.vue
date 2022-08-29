<template>
  <main class="gameheader">
    <section class="gameheader__section">
      <question-mark-circle-icon @click="emits('openhelp')"></question-mark-circle-icon>
      <chart-bar-icon @click="emits('openstats')"></chart-bar-icon>
      <cog-icon @click="emits('opensettings')"></cog-icon>
      <arrow-path-icon @click="emits('reset')"></arrow-path-icon>
    </section>
  </main>
</template>

<script setup lang="ts">
import { QuestionMarkCircleIcon, CogIcon, ChartBarIcon, ArrowPathIcon } from "@heroicons/vue/24/outline"

const emits = defineEmits<{
  (e: "openhelp"): void
  (e: "openstats"): void
  (e: "opensettings"): void
  (e: "reset"): void
}>()
</script>

<style scoped lang="scss">
.gameheader {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
  &__section {
    width: 340px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: var(--text-accent-color);
  }
  svg {
    width: 28px;
    cursor: pointer;
    &:hover {
      opacity: 0.75;
    }
  }
}
</style>
