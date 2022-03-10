import { defineStore } from "pinia"
import Keyboard from "@/utils/keyboard"
import Board from "@/utils/board"
import Wordle from "@/utils/wordle"
import { GameStatus, type GameResult, type ValidKey } from "@/utils/types"
import { watch } from "vue"

export const LOCAL_STORAGE_KEY = "gamestate"
const DEFAULT_WORD_LENGTH = 5

export const useGame = defineStore("game", {
  state: () => ({
    length: DEFAULT_WORD_LENGTH,
    availableLengths: [3, 4, 5, 6, 7, 8],
    wordle: new Wordle(DEFAULT_WORD_LENGTH),
    board: new Board(DEFAULT_WORD_LENGTH, DEFAULT_WORD_LENGTH + 1),
    keyboard: new Keyboard(),
    cheated: false,
    streak: 0,
    over: false,
    errors: [] as string[],
    result: {} as GameResult,
  }),
  getters: {
    word: (state) => state.wordle.word,
    guesses: (state) => state.board.currentRow + 1,
    isValid: (state) => {
      return (w: string) => {
        return state.wordle.isValid(w)
      }
    },
    isCorrect: (state) => {
      return (w: string) => {
        return state.wordle.isCorrect(w)
      }
    },
  },
  actions: {
    initialize() {
      const localStorageState = localStorage.getItem(LOCAL_STORAGE_KEY)
      if (localStorageState) {
        const savedState = JSON.parse(localStorageState)
        this.$patch(savedState)
      }
      if (import.meta.env.DEV) {
        console.info("The word to guess is:", this.word)
      }
      watch(
        () => [...this.errors],
        (newVal, oldVal) => {
          if (newVal.length < oldVal.length) {
            return
          }
          const startIndex = this.board.currentRow * this.word.length
          const endIndex = startIndex + this.word.length
          for (let i = startIndex; i < endIndex; i++) {
            this.board.updateCell(i, { wiggle: true })
          }
          setTimeout(() => {
            this.errors.pop()
            for (let i = startIndex; i < endIndex; i++) {
              this.board.updateCell(i, { wiggle: false })
            }
          }, 2000)
        }
      )
    },
    handleBackspace() {
      this.board.clearLastCellWithLetter()
    },
    handleSubmit() {
      if (this.board.currentRowComplete) {
        if (this.isValid(this.board.inputtedWord)) {
          this.evaluateInputtedWord(this.board.inputtedWord)
          this.board.currentRow++
        } else {
          this.errors.unshift("Not a valid word!")
        }
      } else {
        this.errors.unshift("Not enough letters in word!")
      }
    },
    handleKeypress(key: ValidKey) {
      this.board.updateCell(this.board.nextEmptyCellIndex, { value: key })
    },
    evaluateInputtedWord(input: string) {
      const index = this.board.nextUnevaluatedCellIndex
      const evaluations = this.wordle.getEvaluations(input)
      evaluations.forEach((evaluation, letterIndex) => {
        this.board.updateCell(index + letterIndex, { state: evaluation })
        this.keyboard.updateKeyState(input[letterIndex] as ValidKey, evaluation)
      })
      if (this.isCorrect(input)) {
        if (!this.cheated) {
          this.streak++
        }
        this.result = {
          status: GameStatus.WIN,
          word: this.word,
          streak: this.streak,
          guesses: this.guesses,
          score: this.wordle.getScore(this.word.length + 1, this.guesses - 1),
          cheated: this.cheated,
        }
        this.over = true
        return
      }
      if (this.board.currentRow === this.word.length) {
        this.streak = 0
        this.result = {
          status: GameStatus.LOSS,
          streak: 0,
          word: this.word,
          guesses: this.guesses,
          score: 0,
          cheated: this.cheated,
        }
        this.over = true
      }
    },
    reset() {
      if (!this.over && this.board.currentRow === 0 && this.length === this.word.length) {
        return
      }
      this.wordle = new Wordle(this.length)
      this.board = new Board(this.length, this.length + 1)
      this.keyboard = new Keyboard()
      this.over = false
      this.cheated = false
      this.result = {} as GameResult
      this.errors = []
      if (import.meta.env.DEV) {
        console.info("The word to guess is:", this.word)
      }
    },
  },
})
