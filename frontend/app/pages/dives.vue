<script setup lang="ts">
import { useDiveStore, CALL_ONCE_HEATMAP, CALL_ONCE_LIST } from '~/stores/dive'

// ─── Meta ─────────────────────────────────────────────────────────────────────
useHead({ title: 'Mes plongées — DiveLog' })
definePageMeta({ middleware: 'auth' })
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

const loadMoreDives = () => {  
  diveStore.fetchList()
}

const groupedDives = computed(() => {
  const groups: Record<string, typeof diveStore.list> = {}
  
  for (const dive of diveStore.list) {
    if (!dive.date) continue
    const dateObj = new Date(dive.date)
    // Create a key like "2026-03" for grouping
    const monthKey = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}`
    
    if (!groups[monthKey]) {
      groups[monthKey] = []
    }
    groups[monthKey].push(dive)
  }

  // Sort groups by month descending (most recent first)
  const sortedMonths = Object.keys(groups).sort((a, b) => b.localeCompare(a))
  
  // Format into text, e.g. "Mars 2026", and sort dives within each month
  return sortedMonths.map(monthKey => {
    const parts = monthKey.split('-')
    const year = parts[0] || ''
    const month = parts[1] || ''
    const dateObj = new Date(parseInt(year), parseInt(month) - 1, 1)
    const monthName = dateObj.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })
    const capitalizedMonthName = monthName.charAt(0).toUpperCase() + monthName.slice(1)

    const dives = (groups[monthKey] || []).sort((a, b) => {
      const timeA = a?.date ? new Date(a.date).getTime() : 0;
      const timeB = b?.date ? new Date(b.date).getTime() : 0;
      return timeB - timeA;
    })

    return {
      title: capitalizedMonthName,
      dives
    }
  })
})

/**
 * TODO: Roadmap des fonctionnalités de la page Plongées
 * - [ ] Titre de page centré "Divelog" / "Liste des plongées"
 * - [x] Calendar heatmap (déjà en place)
 * - [ ] Card: Top 5 des pays dans lequel l'user a le plus plongé
 * - [ ] Card: Année la plus active en nombre de plongées en top 3 (ex 2018: 20 plongées, 2016: 15 plongées, 2011: 10 plongées), Mois le plus actif en nombre de plongées (ex Mai 2018)
 * - [ ] Card: Top 5 des buddys avec lequel l'user a le plus plongé
 * - [ ] Liste des plongées (DataTable PrimeVue) https://primevue.org/datatable/
 *     - [ ] Tri
 *     - [ ] Scroll infini ou pagination
 *     - [ ] Groupement par pays
 *     - [ ] Recherche globale
 */
</script>

<template>
  <div class="page-dives">
    <header class="page-dives__header">
      <!-- TODO: Titre de page centré "Divelog" / "Liste des plongées" -->

      <!-- ── Heatmap ────────────────────────────────────────────────────────── -->
      <PrimeFieldset :legend="'Heatmap'" :class="['form__fieldset--flex']">
        <Heatmap
          tooltip-unit="plongées"
          @day-click="(v: any) => filters.global.value = v.date.toISOString().slice(0, 10)"
        />
      </PrimeFieldset>

      <div class="page-dives__stats">
        <!-- TODO: Card Top 5 pays -->
        <!-- TODO: Card Top 5 buddys -->
      </div>
    </header>

    <main class="page-dives__body">
      <!-- TODO: Liste des plongée (DataTable PrimeVue)
           Features: tri, scroll infini / pagination, groupement par pays, recherche globale -->
      <h2 class="page-dives__title text-center my-4 font-semibold text-2xl">My dives list</h2>

      <PrimeDataTable
        :value="diveStore.list"
        :scrollable="true"
        scrollHeight="400px"
        :virtualScrollerOptions="{ lazy: true, onLazyLoad: loadMoreDives, itemSize: 46 }"
        :filters="filters"
        :globalFilterFields="['divingEnvironment.label']"
      >
        <template #header>
          <div class="flex justify-content-end">
            <PrimeInputText v-model="filters.global.value" placeholder="Global Search" />
          </div>
        </template>
        <PrimeColumn field="divingEnvironment.label" header="Environment" :sortable="true"></PrimeColumn>
        <PrimeColumn field="date" header="Date" :sortable="true">
          <template #body="{ data }">
            {{ data.date ? new Date(data.date).toLocaleDateString() : 'N/A' }}
          </template>
        </PrimeColumn>
        <PrimeColumn field="maxDepth" header="Depth" :sortable="true">
          <template #body="{ data }">
            {{ data.maxDepth !== undefined ? `${data.maxDepth} meters` : 'N/A' }}
          </template>
        </PrimeColumn>
        <PrimeColumn field="totalTime" header="Duration" :sortable="true">
          <template #body="{ data }">
            {{ data.totalTime !== undefined ? `${data.totalTime} minutes` : 'N/A' }}
          </template>
        </PrimeColumn>
      </PrimeDataTable>
    </main>
  </div>
</template>

<style scoped lang="scss">
.dives-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 1.5rem;
  margin-top: 2rem;

  @media (max-width: 1400px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
}
</style>