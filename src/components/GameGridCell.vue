<template>
  <div
    class="gameboard__cell"
    :class="[
      `gameboard__cell--${state}`,
      { 'gameboard__cell--wiggle': wiggle },
      { 'gameboard__cell--animate': value },
      { 'gameboard__cell--flip': flip },
    ]"
  >
    {{ value }}
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { EvaluationState, ValidKey } from "@/utils/types"

interface Props {
  value: ValidKey
  state: EvaluationState
  wiggle?: boolean
}

const props = defineProps<Props>()

const flip = computed<boolean>(() => {
  return [EvaluationState.ABSENT, EvaluationState.PRESENT, EvaluationState.MULTIPLE, EvaluationState.CORRECT].includes(
    props.state
  )
})
</script>

<style scoped lang="scss">
@import "./src/assets/scss/variables";
.gameboard {
  &__cell {
    user-select: none;
    width: 60px;
    height: 60px;
    border: 1px solid $color-gameboard-cell-border;
    color: $color-keyboard-key-text;
    font-size: 2rem;
    display: grid;
    place-items: center;
    &--absent {
      background-color: $color-letter-absent;
      border: none !important;
    }
    &--present {
      background-color: $color-letter-present;
      border: none !important;
    }
    &--correct {
      background-color: $color-letter-correct;
      border: none !important;
    }
    &--multiple {
      background: linear-gradient(
        135deg,
        $color-letter-correct,
        $color-letter-correct 50%,
        $color-letter-present 50%,
        $color-letter-present 100%
      );
      border: none !important;
    }
    &--animate {
      animation: scale 0.2s;
      animation-iteration-count: 1;
    }
    &--wiggle {
      animation: wiggle 0.3s;
      animation-iteration-count: 3;
    }
    &--flip {
      animation: flip 0.5s;
      animation-iteration-count: 1;
    }
  }
}

@keyframes scale {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes wiggle {
  0% {
    transform: translateX(0px);
  }
  25% {
    transform: translateX(-5px);
  }
  50% {
    transform: translateX(0px);
  }
  75% {
    transform: translateX(5px);
  }
  100% {
    transform: translateX(0px);
  }
}

@keyframes flip {
  0% {
    transform: scaleY(1);
  }
  50% {
    transform: scaleY(0);
  }
  100% {
    transform: scaleY(1);
  }
}
</style>
