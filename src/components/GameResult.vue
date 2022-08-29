<template>
  <main class="gameresult">
    <div class="gameresult__text">
      <div>
        <div class="gameresult__icon">
          <check-circle-icon
            v-if="result?.status === GameStatus.WIN"
            class="gameresult__icon--correct"
          ></check-circle-icon>
          <x-circle-icon v-else-if="result?.status === GameStatus.LOSS" class="gameresult__icon--wrong"></x-circle-icon>
          <minus-circle-icon v-else class="gameresult__icon--neutral"></minus-circle-icon>
        </div>
        <p v-if="result?.status === GameStatus.WIN" class="gameresult__heading">You Win!</p>
        <p v-else-if="result?.status === GameStatus.LOSS" class="gameresult__heading">You Lose!</p>
        <p v-else class="gameresult__heading">Game In Progress!</p>
      </div>
      <section v-if="[GameStatus.WIN, GameStatus.LOSS].includes(result.status)" class="gameresult__stats">
        <p class="gameresult__stats__text">Game Stats:</p>
        <article class="gameresult__stats__stat">
          <span>Word:</span>
          <span>{{ result?.word }}</span>
        </article>
        <article class="gameresult__stats__stat">
          <span>Guesses:</span>
          <span>{{ result?.guesses }}</span>
        </article>
        <article class="gameresult__stats__stat">
          <span>Score:</span>
          <span>{{ result?.score }}</span>
        </article>
        <article v-if="result?.cheated" class="gameresult__stats__cheater">
          <span>You cheated by looking at the word. This wont count towards your overall stats!</span>
        </article>
      </section>
      <section v-if="!result?.cheated" class="gameresult__stats">
        <p class="gameresult__stats__text">Overall Stats:</p>
        <article class="gameresult__stats__stat">
          <span>Current Streak:</span>
          <span>{{ stats.currentStreak }}</span>
        </article>
        <article class="gameresult__stats__stat">
          <span>Longest Streak:</span>
          <span>{{ stats.longestStreak }}</span>
        </article>
        <article class="gameresult__stats__stat">
          <span>Total Wins:</span>
          <span>{{ stats.totalGamesWon }} ({{ stats.totalGamesPlayed }} played)</span>
        </article>
        <article class="gameresult__stats__stat">
          <span>Total Score:</span>
          <span>{{ stats.totalScore }}</span>
        </article>
      </section>
      <div class="gameresult__button">
        <button @click="emits('playagain')">Play Again</button>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { CheckCircleIcon, XCircleIcon, MinusCircleIcon } from "@heroicons/vue/20/solid"
import { type GameResult, GameStatus } from "@/utils/types"
import { useStats } from "@/stores/stats"

interface Props {
  result: GameResult
}

defineProps<Props>()

const emits = defineEmits<{
  (e: "playagain"): void
}>()

const stats = useStats()
</script>

<style scoped lang="scss">
.gameresult {
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: flex-start !important;
  align-items: center;
  overflow: auto;
  @media only screen and (max-width: 400px) {
    padding: 0.5rem;
  }
  &__icon {
    display: flex;
    justify-content: center;
    &--correct {
      width: 45px;
      color: var(--correct-color);
    }
    &--wrong {
      width: 45px;
      color: var(--incorrect-color);
    }
    &--neutral {
      width: 45px;
      color: var(--text-accent-color);
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
    padding: 0 2rem 2rem 2rem;
    &__text {
      margin: 0 0 0.5rem 0;
      color: var(--text-color);
    }
    &__stat {
      display: flex;
      justify-content: space-between;
      span {
        font-size: 1rem;
      }
    }
    &__cheater {
      color: var(--text-color);
      font-size: 1.1rem;
      padding-top: 1rem;
    }
  }
  &__button {
    display: flex;
    justify-content: center;
    padding-top: 1rem;
    button {
      color: var(--text-color);
      background-color: var(--bg-accent-color);
      padding: 0.5rem 1rem 0.5rem 1rem;
      cursor: pointer;
      user-select: none;
      border-radius: 5px;
      border-color: var(--bg-accent-color);
      outline: none;
      &:focus {
        outline: 0 !important;
      }
      &:hover {
        opacity: 0.75;
      }
    }
  }
}
</style>
