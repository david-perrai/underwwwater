<script setup lang="ts">
import { useDiveStore, CALL_ONCE_HEATMAP, CALL_ONCE_LIST } from '~/stores/dive'

// ─── Meta ─────────────────────────────────────────────────────────────────────
useHead({ title: 'Mes plongées — DiveLog' })

// ─── Store ────────────────────────────────────────────────────────────────────
const diveStore = useDiveStore()
const year      = new Date().getFullYear()

/**
 * Si l'utilisateur vient du dashboard, le heatmap de l'année courante
 * est déjà en cache → fetchHeatmapYear retourne immédiatement.
 * Idem pour callOnce : le callback ne se ré-exécute jamais.
 */
await callOnce(CALL_ONCE_HEATMAP(year),      () => diveStore.fetchHeatmapYear(year))
await callOnce(CALL_ONCE_HEATMAP(year - 1),  () => diveStore.fetchHeatmapYear(year - 1))
await callOnce(CALL_ONCE_LIST,               () => diveStore.fetchList())

// ─── DataTable ────────────────────────────────────────────────────────────────
const filters = ref({
  global: { value: null, matchMode: 'contains' },
})
</script>

<template>
  <div class="dives-page">
    <!-- ── Heatmap ────────────────────────────────────────────────────────── -->
    <section class="dives-section">
      <Heatmap
        tooltip-unit="plongées"
        @day-click="(v) => filters.global.value = v.date.toISOString().slice(0, 10)"
      />
    </section>

   
  </div>
</template>