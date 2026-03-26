/**
 * composables/useHeatmap.ts
 *
 * Toute la logique du CalendarHeatmap : navigation par année,
 * calcul de la grille, labels, dimensions SVG.
 *
 * Le composant ne garde que le template et les interactions DOM
 * qui ne peuvent pas être extraites (ref SVG → géré par v-prime-tooltip).
 */

import { useDiveStore } from '~/stores/dive'

// ─── Types ────────────────────────────────────────────────────────────────────
export interface Cell {
  date:  Date
  count: number
  /** -1 = hors plage visible, 0 = aucune plongée, 1-4 = intensité */
  level: number
}

// ─── Constantes exportées (utilisées dans le template) ───────────────────────
export const HEATMAP = {
  SQUARE_SIZE:        11,
  SQUARE_GAP:         2,
  get CELL()          { return this.SQUARE_SIZE + this.SQUARE_GAP },
  WEEKS_IN_YEAR:      53,
  MONTH_LABEL_HEIGHT: 16,
  DAY_LABEL_WIDTH:    28,
} as const

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] as const
const DAYS   = ['', 'Mon', '', 'Wed', '', 'Fri', ''] as const

// ─── Helpers ──────────────────────────────────────────────────────────────────
function toKey(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function addDays(d: Date, n: number): Date {
  const r = new Date(d)
  r.setDate(r.getDate() + n)
  return r
}

// ─── Composable ───────────────────────────────────────────────────────────────
export function useHeatmap() {
  const diveStore = useDiveStore()

  // ── Navigation par année ──────────────────────────────────────────────────
  const TODAY         = new Date()
  const currentYear   = ref(TODAY.getFullYear())
  const isCurrentYear = computed(() => currentYear.value === TODAY.getFullYear())

  /**
   * true pendant le fetch → data-level forcé à 0 sur toutes les cellules.
   * La transition CSS fill s'occupe de l'animation vers les vraies couleurs.
   */
  const isTransitioning = ref(false)

  async function fetchYearWithPrev(year: number): Promise<void> {
    isTransitioning.value = true

    // Les deux fetches partent en parallèle.
    await Promise.all([
      diveStore.fetchHeatmapYear(year),
      diveStore.fetchHeatmapYear(year - 1),
    ])

    // nextTick : Vue patche le DOM avec data-level="0" d'abord,
    // puis isTransitioning passe à false → la transition CSS fill démarre.
    await nextTick()
    isTransitioning.value = false
  }

  async function goToPreviousYear(): Promise<void> {
    currentYear.value--
    await fetchYearWithPrev(currentYear.value)
  }

  async function goToNextYear(): Promise<void> {
    if (isCurrentYear.value) return
    currentYear.value++
    await fetchYearWithPrev(currentYear.value)
  }

  // ── Données fusionnées n-1 + n ────────────────────────────────────────────
  // La fenêtre de 53 semaines débute fin décembre de n-1 :
  // on doit donc avoir les deux années en mémoire.
  const values = computed(() => [
    ...diveStore.getHeatmapYear(currentYear.value - 1),
    ...diveStore.getHeatmapYear(currentYear.value),
  ])

  // ── Total pour le compteur dans l'en-tête ─────────────────────────────────
  const yearTotal = computed(() =>
    diveStore.getHeatmapYear(currentYear.value).reduce((sum, v) => sum + v.count, 0),
  )

  // ── Dates de début / fin ──────────────────────────────────────────────────
  const endDate = computed(() =>
    isCurrentYear.value
      ? new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate())
      : new Date(currentYear.value, 11, 31),
  )

  const startDate = computed(() => {
    const d   = addDays(endDate.value, -(HEATMAP.WEEKS_IN_YEAR - 1) * 7)
    const dow = d.getDay()
    return addDays(d, -dow) // aligner sur dimanche
  })

  // ── Map date → count ──────────────────────────────────────────────────────
  const valueMap = computed(() => {
    const m = new Map<string, number>()
    for (const v of values.value) m.set(v.date, v.count)
    return m
  })

  const maxValue = computed(() => {
    let max = 0
    for (const v of values.value) if (v.count > max) max = v.count
    return max || 1
  })

  // ── Grille de semaines ────────────────────────────────────────────────────
  const weeks = computed<Cell[][]>(() => {
    const result: Cell[][] = []
    let current = new Date(startDate.value)
    const end   = endDate.value

    while (current <= end) {
      const week: Cell[] = []
      for (let d = 0; d < 7; d++) {
        const day = new Date(current)
        if (day <= end) {
          const count = valueMap.value.get(toKey(day)) ?? 0
          const level = count === 0
            ? 0
            : Math.min(Math.ceil((count / maxValue.value) * 4), 4)
          week.push({ date: day, count, level })
        } else {
          week.push({ date: day, count: -1, level: -1 })
        }
        current = addDays(current, 1)
      }
      result.push(week)
    }
    return result
  })

  // ── Labels des mois ───────────────────────────────────────────────────────
  const monthLabels = computed(() => {
    const labels: Array<{ text: string; x: number }> = []
    let lastMonth = -1

    weeks.value.forEach((week, wi) => {
      const firstValid = week.find(d => d.level >= 0)
      if (!firstValid) return
      const m = firstValid.date.getMonth()
      if (m !== lastMonth) {
        labels.push({ text: MONTHS[m]!, x: wi * HEATMAP.CELL })
        lastMonth = m
      }
    })
    return labels
  })

  // ── Dimensions SVG ────────────────────────────────────────────────────────
  const svgWidth  = computed(() => HEATMAP.DAY_LABEL_WIDTH + weeks.value.length * HEATMAP.CELL)
  const svgHeight = computed(() => HEATMAP.MONTH_LABEL_HEIGHT + 7 * HEATMAP.CELL)

  // ── Niveau effectif d'une cellule (gère la transition) ───────────────────
  // Retourne 0 pendant isTransitioning pour que le CSS applique COLORS[0]
  // puis déclenche la transition fill vers le vrai niveau.
  function cellLevel(cell: Cell): number {
    if (cell.level === -1) return -1
    return isTransitioning.value ? 0 : cell.level
  }

  // ── Positions ─────────────────────────────────────────────────────────────
  function cellX(wi: number): number { return HEATMAP.DAY_LABEL_WIDTH + wi * HEATMAP.CELL }
  function cellY(di: number): number { return HEATMAP.MONTH_LABEL_HEIGHT + di * HEATMAP.CELL }

  // ── Formatage du tooltip ──────────────────────────────────────────────────
  function formatTooltip(cell: Cell): string {
    if (cell.level === -1) return ''

    const dateStr = cell.date.toLocaleDateString('en-US', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    })

    if (cell.count === 0) return `No dive — ${dateStr}`
    return `${cell.count} dive${cell.count > 1 ? 's' : ''} — ${dateStr}`
  }

  // ── Interaction ───────────────────────────────────────────────────────────
  function onDayClick(cell: Cell) {
    if (cell.level <= 0) return
    diveStore.applyFilters({
      ...diveStore.activeFilters,
      date: toKey(cell.date),
    })
  }

  return {
    // Store (pour heatmapLoading, heatmapError dans le template)
    diveStore,

    // Navigation
    currentYear,
    isCurrentYear,
    isTransitioning,
    goToPreviousYear,
    goToNextYear,
    fetchYearWithPrev,

    // Stats
    yearTotal,

    // Grille
    weeks,
    monthLabels,
    svgWidth,
    svgHeight,
    DAYS,

    // Helpers template
    cellLevel,
    cellX,
    cellY,
    formatTooltip,
    onDayClick,

    // Constantes de taille (pour les positions inline et v-bind CSS)
    HEATMAP,
  }
}