<script setup lang="ts">
/**
 * CalendarHeatmap.vue
 *
 * Composant "smart" : lit ses données directement depuis useDiveStore.
 * Toujours en dark mode — palette GitHub dark fixe.
 *
 * Props :
 *   tooltipUnit   string       — unité affichée dans le tooltip (défaut : 'plongées')
 *   round         number       — border-radius des cellules     (défaut : 2)
 *   noDataText    string|false — texte si count = 0             (défaut : 'Aucune plongée')
 *
 * Events :
 *   @day-click({ date: Date, count: number })
 */

import { useDiveStore } from '~/stores/dive'

interface Props {
  tooltipUnit?: string
  round?:       number
  noDataText?:  string | false
}

const props = withDefaults(defineProps<Props>(), {
  tooltipUnit: 'plongées',
  round:       2,
  noDataText:  'Aucune plongée',
})

const emit = defineEmits<{
  'day-click': [value: { date: Date; count: number }]
}>()

// ─── Palette dark fixe (style GitHub dark) ────────────────────────────────────
const COLORS      = ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'] as const
const LABEL_COLOR = '#8b949e'

// ─── Store ────────────────────────────────────────────────────────────────────
const diveStore = useDiveStore()

// ─── Navigation par année ─────────────────────────────────────────────────────
const TODAY         = new Date()
const currentYear   = ref(TODAY.getFullYear())
const isCurrentYear = computed(() => currentYear.value === TODAY.getFullYear())

/**
 * La fenêtre de 53 semaines débute toujours fin décembre de n-1.
 * On fetche donc n ET n-1 en parallèle pour alimenter les cellules
 * de début d'année visibles sur le heatmap.
 */
// true pendant le fetch → toutes les cellules s'affichent en niveau 0
// puis passent en douceur à leur vraie couleur via CSS transition
const isTransitioning = ref(false)

async function fetchYearWithPrev(year: number) {
  isTransitioning.value = true
  await Promise.all([
    diveStore.fetchHeatmapYear(year),
    diveStore.fetchHeatmapYear(year - 1),
  ])
  // Micro-tick pour que Vue applique d'abord les cellules à niveau 0,
  // puis le prochain frame déclenche la transition CSS fill vers les vraies couleurs
  await nextTick()
  isTransitioning.value = false
}

async function goToPreviousYear() {
  currentYear.value--
  await fetchYearWithPrev(currentYear.value)
}

async function goToNextYear() {
  if (isCurrentYear.value) return
  currentYear.value++
  await fetchYearWithPrev(currentYear.value)
}

// Merge n-1 + n pour couvrir toute la fenêtre affichée
const values = computed(() => [
  ...diveStore.getHeatmapYear(currentYear.value - 1),
  ...diveStore.getHeatmapYear(currentYear.value),
])

// ─── Constants ────────────────────────────────────────────────────────────────
const SQUARE_SIZE        = 11
const SQUARE_GAP         = 2
const CELL               = SQUARE_SIZE + SQUARE_GAP
const WEEKS_IN_YEAR      = 53
const MONTH_LABEL_HEIGHT = 16
const DAY_LABEL_WIDTH    = 28

const MONTHS = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc']
const DAYS   = ['', 'Lun', '', 'Mer', '', 'Ven', '']

// ─── Helpers ──────────────────────────────────────────────────────────────────
function toKey(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function addDays(d: Date, n: number): Date {
  const r = new Date(d)
  r.setDate(r.getDate() + n)
  return r
}

// ─── Dates de début / fin ─────────────────────────────────────────────────────
const endDate = computed(() =>
  isCurrentYear.value
    ? new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate())
    : new Date(currentYear.value, 11, 31),
)

const startDate = computed(() => {
  const d   = addDays(endDate.value, -(WEEKS_IN_YEAR - 1) * 7)
  const dow = d.getDay()
  return addDays(d, -dow)
})

// ─── Map date→count & max ─────────────────────────────────────────────────────
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

// ─── Grille de semaines ───────────────────────────────────────────────────────
interface Cell {
  date:  Date
  count: number
  level: number // -1 = hors plage, 0-4 = intensité
}

const weeks = computed(() => {
  const result: Cell[][] = []
  let current = new Date(startDate.value)
  const end   = endDate.value

  while (current <= end) {
    const week: Cell[] = []
    for (let d = 0; d < 7; d++) {
      const day = new Date(current)
      if (day <= end) {
        const count = valueMap.value.get(toKey(day)) ?? 0
        const level = count === 0 ? 0 : Math.min(Math.ceil((count / maxValue.value) * 4), 4)
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

// ─── Labels des mois ──────────────────────────────────────────────────────────
const monthLabels = computed(() => {
  const labels: Array<{ text: string; x: number }> = []
  let lastMonth = -1
  weeks.value.forEach((week, wi) => {
    const firstValid = week.find(d => d.level >= 0)
    if (!firstValid) return
    const m = firstValid.date.getMonth()
    if (m !== lastMonth) {
      labels.push({ text: MONTHS[m], x: wi * CELL })
      lastMonth = m
    }
  })
  return labels
})

// ─── SVG dimensions ───────────────────────────────────────────────────────────
const svgWidth  = computed(() => DAY_LABEL_WIDTH + weeks.value.length * CELL)
const svgHeight = computed(() => MONTH_LABEL_HEIGHT + 7 * CELL)

// ─── Couleur d'une cellule ────────────────────────────────────────────────────
// Pendant la transition : niveau 0 pour tout (fond sombre), puis fade CSS
function cellColor(level: number): string {
  if (level === -1) return 'transparent'
  return isTransitioning.value ? COLORS[0] : COLORS[level]
}

// ─── Positions ────────────────────────────────────────────────────────────────
function cellX(wi: number): number { return DAY_LABEL_WIDTH + wi * CELL }
function cellY(di: number): number { return MONTH_LABEL_HEIGHT + di * CELL }

// ─── Tooltip ──────────────────────────────────────────────────────────────────
const svgRef  = ref<SVGSVGElement | null>(null)
const tooltip = ref({ visible: false, x: 0, y: 0, text: '' })

function formatTooltip(cell: Cell): string {
  const dateStr = cell.date.toLocaleDateString('fr-FR', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  })
  if (cell.count === 0) {
    return props.noDataText === false ? '' : `${props.noDataText} — ${dateStr}`
  }
  return `${cell.count} ${props.tooltipUnit} — ${dateStr}`
}

function onMouseEnter(event: MouseEvent, cell: Cell) {
  if (cell.level === -1) return
  const text = formatTooltip(cell)
  if (!text) return
  const rect    = (event.target as SVGRectElement).getBoundingClientRect()
  const svgRect = svgRef.value!.getBoundingClientRect()
  tooltip.value = {
    visible: true,
    x: rect.left - svgRect.left + SQUARE_SIZE / 2,
    y: rect.top  - svgRect.top  - 6,
    text,
  }
}

function onMouseLeave() { tooltip.value.visible = false }

function onDayClick(cell: Cell) {
  if (cell.level === -1) return
  emit('day-click', { date: cell.date, count: cell.count })
}
</script>

<template>
  <div class="calendar-heatmap">
    <!-- En-tête : navigation + compteur -->
    <div class="heatmap-header">
      <div class="heatmap-nav">
        <Button
          icon="pi pi-chevron-left"
          severity="secondary"
          text
          rounded
          size="small"
          aria-label="Année précédente"
          :loading="diveStore.heatmapLoading"
          @click="goToPreviousYear"
        />
        <span class="heatmap-year">{{ currentYear }}</span>
        <Button
          icon="pi pi-chevron-right"
          severity="secondary"
          text
          rounded
          size="small"
          :disabled="isCurrentYear"
          aria-label="Année suivante"
          @click="goToNextYear"
        />
      </div>

      <span class="heatmap-total">
        <template v-if="!diveStore.heatmapLoading">
          {{ values.reduce((sum, v) => sum + v.count, 0) }}
          {{ tooltipUnit }} en {{ currentYear }}
        </template>
      </span>
    </div>

    <!-- Erreur -->
    <Message
      v-if="diveStore.heatmapError"
      severity="error"
      :closable="false"
    >
      {{ diveStore.heatmapError }}
    </Message>

    <!-- SVG — toujours monté, les cellules transitionnent via CSS fill -->
    <div class="heatmap-svg-wrapper">
      <svg
        ref="svgRef"
        :width="svgWidth"
        :height="svgHeight"
        class="heatmap-svg"
        style="overflow: visible"
      >
        <!-- Labels mois -->
        <text
          v-for="label in monthLabels"
          :key="label.text + label.x"
          :x="DAY_LABEL_WIDTH + label.x"
          :y="MONTH_LABEL_HEIGHT - 4"
          :fill="LABEL_COLOR"
          font-size="10"
          font-family="system-ui, sans-serif"
        >
          {{ label.text }}
        </text>

        <!-- Labels jours -->
        <text
          v-for="(day, di) in DAYS"
          :key="di"
          x="0"
          :y="MONTH_LABEL_HEIGHT + di * CELL + SQUARE_SIZE"
          :fill="LABEL_COLOR"
          font-size="9"
          font-family="system-ui, sans-serif"
        >
          {{ day }}
        </text>

        <!-- Cellules -->
        <g v-for="(week, wi) in weeks" :key="wi">
          <rect
            v-for="(cell, di) in week"
            :key="di"
            :x="cellX(wi)"
            :y="cellY(di)"
            :width="SQUARE_SIZE"
            :height="SQUARE_SIZE"
            :rx="round"
            :ry="round"
            :fill="cellColor(cell.level)"
            class="day-cell"
            :class="{ 'day-cell--active': cell.level >= 0 }"
            @mouseenter="onMouseEnter($event, cell)"
            @mouseleave="onMouseLeave"
            @click="onDayClick(cell)"
          />
        </g>
      </svg>

      <!-- Tooltip -->
      <Transition name="tooltip-fade">
        <div
          v-if="tooltip.visible"
          class="heatmap-tooltip"
          :style="{ left: `${tooltip.x}px`, top: `${tooltip.y}px` }"
        >
          {{ tooltip.text }}
        </div>
      </Transition>
    </div>

  </div>
</template>

<style scoped>
.calendar-heatmap {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  gap: 8px;
  font-family: system-ui, sans-serif;
}

/* ── Header ── */
.heatmap-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: v-bind("`${DAY_LABEL_WIDTH}px`");
}

.heatmap-nav {
  display: flex;
  align-items: center;
  gap: 4px;
}

.heatmap-year {
  font-size: 13px;
  font-weight: 600;
  min-width: 36px;
  text-align: center;
}

.heatmap-total {
  font-size: 12px;
  color: #8b949e;
}

/* ── Cellules ── */
.heatmap-svg-wrapper {
  position: relative;
}

.day-cell {
  cursor: default;
  transition: fill 0.45s ease, opacity 0.1s;
}

.day-cell--active {
  cursor: pointer;
}

.day-cell--active:hover {
  opacity: 0.75;
  outline: 1px solid rgba(240, 246, 252, 0.3);
  outline-offset: -1px;
}

/* ── Tooltip ── */
.heatmap-tooltip {
  position: absolute;
  transform: translate(-50%, -100%);
  background: #24292f;
  color: #e6edf3;
  font-size: 11px;
  padding: 5px 8px;
  border-radius: 6px;
  white-space: nowrap;
  pointer-events: none;
  z-index: 100;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  border: 1px solid #30363d;
}

.heatmap-tooltip::after {
  content: '';
  position: absolute;
  left: 50%;
  top: 100%;
  transform: translateX(-50%);
  border: 5px solid transparent;
  border-top-color: #30363d;
}

.tooltip-fade-enter-active,
.tooltip-fade-leave-active { transition: opacity 0.15s; }
.tooltip-fade-enter-from,
.tooltip-fade-leave-to      { opacity: 0; }


</style>