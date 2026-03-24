<script setup lang="ts">
/** Composables */
const {
  diveStore,
  currentYear, isCurrentYear,
  goToPreviousYear, goToNextYear,
  yearTotal,
  weeks, monthLabels, svgWidth, svgHeight, DAYS,
  cellLevel, cellX, cellY, formatTooltip,
  onDayClick,
  HEATMAP,
} = useHeatmap()
</script>

<template>
  <div class="heatmap">
    <div class="heatmap__header">
      <div class="heatmap__nav">
        <PrimeButton
          icon="pi pi-chevron-left"
          severity="secondary"
          text
          rounded
          size="small"
          aria-label="Année précédente"
          :loading="diveStore.heatmapLoading"
          @click="goToPreviousYear"
        />
        <span class="heatmap__year">{{ currentYear }}</span>
        <PrimeButton
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

      <span class="heatmap__total">
        <template v-if="!diveStore.heatmapLoading">
          {{ yearTotal }} dive{{ yearTotal > 1 ? 's' : '' }} in {{ currentYear }}
        </template>
      </span>
    </div>

    <PrimeMessage
      v-if="diveStore.heatmapError"
      severity="error"
      :closable="false"
    >
      {{ diveStore.heatmapError }}
    </PrimeMessage>

    <!-- ── SVG — toujours monté, fill transite via CSS ───────────────────── -->
    <div class="heatmap__svg-wrapper">
      <svg
        :width="svgWidth"
        :height="svgHeight"
        style="overflow: visible"
      >
        <!-- Labels mois -->
        <text
          v-for="label in monthLabels"
          :key="label.text + label.x"
          :x="HEATMAP.DAY_LABEL_WIDTH + label.x"
          :y="HEATMAP.MONTH_LABEL_HEIGHT - 4"
          class="heatmap__label"
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
          :y="HEATMAP.MONTH_LABEL_HEIGHT + di * HEATMAP.CELL + HEATMAP.SQUARE_SIZE"
          class="heatmap__label"
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
            v-prime-tooltip.top="{
              value: formatTooltip(cell),
              showDelay: 100,
              hideDelay: 0,
            }"
            :x="cellX(wi)"
            :y="cellY(di)"
            :width="HEATMAP.SQUARE_SIZE"
            :height="HEATMAP.SQUARE_SIZE"
            rx="3"
            ry="3"
            :data-level="cellLevel(cell)"
            class="heatmap__cell"
            :class="{ 'heatmap__cell--active': cell.level >= 0 }"
            @click="onDayClick(cell)"
          />
        </g>
      </svg>
    </div>
  </div>
</template>

<style scoped>
/* ── Conteneur ── */
.heatmap {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  gap: 8px;
  font-family: system-ui, sans-serif;
}

/* ── Header ── */
.heatmap__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: v-bind("`${HEATMAP.DAY_LABEL_WIDTH}px`");
}

.heatmap__nav {
  display: flex;
  align-items: center;
  gap: 4px;
}

.heatmap__year {
  font-size: 13px;
  font-weight: 600;
  min-width: 36px;
  text-align: center;
}

.heatmap__total {
  font-size: 12px;
  color: var(--p-abyss-300, #8b949e);
}

/* ── SVG ── */
.heatmap__svg-wrapper {
  position: relative;
}

/* Labels (fill via CSS pour bénéficier des tokens) */
.heatmap__label {
  fill: var(--p-abyss-300, #8b949e);
}

/* ── Cellules : couleurs via tokens PrimeVue ── */
/*
 * On utilise data-level + CSS plutôt que :fill="" en JS,
 * parce que les CSS custom properties (var(--p-*)) ne fonctionnent
 * pas dans les attributs SVG de présentation — seulement en CSS.
 *
 * La transition sur `fill` gère aussi l'animation isTransitioning :
 * quand data-level passe de 0 → vrai niveau, le CSS anime automatiquement.
 */
.heatmap__cell {
  cursor: default;
  fill: var(--p-blue-950);
  transition: fill 0.45s ease, opacity 0.1s;
}

.heatmap__cell[data-level="-1"] { fill: transparent; }
.heatmap__cell[data-level="0"]  { fill: var(--p-blue-950); }
.heatmap__cell[data-level="1"]  { fill: var(--p-blue-800); }
.heatmap__cell[data-level="2"]  { fill: var(--p-blue-500); }
.heatmap__cell[data-level="3"]  { fill: var(--p-blue-300); }
.heatmap__cell[data-level="4"]  { fill: var(--p-blue-50); }

.heatmap__cell--active {
  cursor: pointer;
}

.heatmap__cell--active:hover {
  opacity: 0.75;
  outline: 1px solid rgba(240, 246, 252, 0.2);
  outline-offset: -1px;
}
</style>