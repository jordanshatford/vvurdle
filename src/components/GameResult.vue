<template>
  <main class="gameresult">
    <div class="gameresult__text">
      <div>
        <div class="gameresult__icon">
          <ph-check-circle
            v-if="result?.status === GameStatus.WIN"
            :size="50"
            weight="fill"
            class="gameresult__icon--correct"
          ></ph-check-circle>
          <ph-x-circle v-else :size="50" weight="fill" class="gameresult__icon--wrong"></ph-x-circle>
        </div>
        <p class="gameresult__heading">{{ result?.status === GameStatus.WIN ? "You Win!" : "You Lost!" }}</p>
      </div>
      <section class="gameresult__stats">
        <article class="gameresult__stats__stat">
          <span>Word: </span>
          <span>{{ result?.word }}</span>
        </article>
        <article class="gameresult__stats__stat">
          <span>Guesses:</span>
          <span>{{ result?.guesses }}</span>
        </article>
        <article class="gameresult__stats__stat">
          <span>Score: </span>
          <span>{{ result?.score }}</span>
        </article>
        <article class="gameresult__stats__stat">
          <span>Streak: </span>
          <span>{{ result?.streak }}</span>
        </article>
        <article class="gameresult__stats__stat">
          <span>Cheated: </span>
          <span>{{ result?.cheated }}</span>
        </article>
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
import { PhCheckCircle, PhXCircle } from "phosphor-vue"
import { type GameResult, GameStatus } from "@/utils/types"

interface Props {
  result?: GameResult
}

defineProps<Props>()
</script>

<style scoped lang="scss">
.gameresult {
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: flex-start !important;
  align-items: center;
  overflow: auto;
  padding: 1rem;
  padding-top: 0;
  @media only screen and (max-width: 400px) {
    padding: 0.5rem;
  }
  &__icon {
    display: flex;
    justify-content: center;
    &--correct {
      color: var(--correct-color);
    }
    &--wrong {
      color: var(--incorrect-color);
    }
  }
  &__heading {
    display: flex;
    justify-content: center;
    color: var(--text-color);
    padding-bottom: 1rem;
    font-size: 1.25rem;
  }
  &__text {
    color: var(--text-accent-color);
  }
  &__stats {
    padding-left: 2rem;
    padding-right: 2em;
    &__stat {
      display: flex;
      justify-content: space-between;
      span {
        font-size: 1rem;
      }
    }
  }
}
</style>