<template>
  <footer class="appfooter">
    <div class="appfooter__container">
      <p class="appfooter__text">© {{ new Date().getFullYear() }} {{ creator }}</p>
      <a :href="githubLink" class="appfooter__text" target="_blank">
        <GithubLogo class="appfooter__icon" />
      </a>
    </div>
  </footer>
</template>

<script setup lang="ts">
import GithubLogo from '@/components/GithubLogo.vue'

const creator = 'Jordan Shatford'
const githubLink = 'https://github.com/jordanshatford/vvurdle'
</script>

<style scoped lang="scss">
.appfooter {
  background-color: var(--bg-color);
  &__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-left: 2rem;
    padding-right: 2rem;
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
    margin-right: auto;
    margin-left: auto;
  }
  &__text {
    color: var(--text-accent-color);
  }
  &__icon {
    width: 2rem;
  }
}
</style>
