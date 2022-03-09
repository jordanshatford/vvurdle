import { ref, computed, reactive, type Ref } from "vue"
import { ValidKey, EvaluationState, type CellInfo } from "@/utils/types"

export function initialize(width: number, length: number): CellInfo[] {
  return [...Array(width * length)].map(() => {
    return { value: ValidKey.BLANK, state: EvaluationState.UNKNOWN, wiggle: false }
  })
}

export function useBoard(dimensions: Ref<{ width: number; length: number }>) {
  const board = reactive({
    value: initialize(dimensions.value.width, dimensions.value.length),
    width: dimensions.value.width,
    length: dimensions.value.length,
  })

  const currentRow = ref(0)

  const nextEmptyCell = computed(() => {
    return board.value.findIndex((cell) => cell.value === ValidKey.BLANK)
  })

  const nextUnevaluatedCell = computed(() => {
    return board.value.findIndex((cell) => cell.state === EvaluationState.UNKNOWN)
  })

  const inputtedWord = computed(() => {
    let word = ""
    const startIndex = currentRow.value * board.width
    for (let i = startIndex; i < startIndex + board.width; i++) {
      word += board.value[i].value
    }
    return word
  })

  const currentRowComplete = computed(() => {
    const index = nextEmptyCell.value === -1 ? board.width * board.length : nextEmptyCell.value
    const row = Math.floor((index - 1) / board.width)
    const isCurrentRow = row === currentRow.value
    const rowComplete = index % board.width === 0
    return isCurrentRow && rowComplete
  })

  function updateCell(index: number, values: Partial<CellInfo>) {
    const isCurrentRow = Math.floor(index / board.width) === currentRow.value
    if (isCurrentRow) {
      board.value[index] = { ...board.value[index], ...values }
    }
  }

  function clearLastCellWithLetter() {
    if (nextEmptyCell.value === -1) {
      // All board cells are filled, make last cell blank
      board.value[board.value.length - 1].value = ValidKey.BLANK
      return
    }
    const isCurrentRow = Math.floor((nextEmptyCell.value - 1) / board.width) === currentRow.value
    if (isCurrentRow) {
      const lastNonEmptyCell = board.value.filter((cell) => cell.value !== ValidKey.BLANK).length - 1
      board.value[lastNonEmptyCell].value = ValidKey.BLANK
    }
  }

  function reset() {
    board.value = initialize(dimensions.value.width, dimensions.value.length)
    board.width = dimensions.value.width
    board.length = dimensions.value.length
    currentRow.value = 0
  }

  return {
    board,
    currentRow,
    currentRowComplete,
    nextEmptyCell,
    nextUnevaluatedCell,
    inputtedWord,
    clearLastCellWithLetter,
    updateCell,
    reset,
  }
}
