<script setup lang="ts">
import { event } from '@primeuix/themes/aura/timeline'
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

// ─── Filtres colonnes ─────────────────────────────────────────────────────────
const filterDate        = ref('')
const filterDepth       = ref<number | null>(null)
const filterDuration    = ref<number | null>(null)
const filterEnvironment = ref('')

let debounceTimer: ReturnType<typeof setTimeout> | null = null

function debounce(callback: () => void){
 if (debounceTimer) clearTimeout(debounceTimer)
  debounceTimer = setTimeout(callback, 400);
}

function onFilterChange() {  
  debounce(() => {
    diveStore.applyFilters({
      ...(filterDate.value        ? { date: filterDate.value }                         : {}),
      ...(filterDepth.value       ? { maxDepth: filterDepth.value }                    : {}),
      ...(filterDuration.value    ? { totalTime: filterDuration.value }                : {}),
      ...(filterEnvironment.value ? { divingEnvironment: filterEnvironment.value }     : {}),
    });
  })
}

function onDepthChange(event: any) {
 debounce(()=>{
  filterDepth.value = event.value
  onFilterChange()
 })
}

function onDurationChange(event: any) {
  debounce(()=>{
    filterDuration.value = event.value
    onFilterChange()
  })
}

// ─── Scroll infini ────────────────────────────────────────────────────────────
const loadMoreDives = () => {  
  diveStore.fetchList()
}

/**
 * TODO: Roadmap des fonctionnalités de la page Plongées
 * - [ ] Titre de page centré "Divelog" / "Liste des plongées"
 * - [x] Calendar heatmap (déjà en place)
 * - [ ] Card: Top 5 des pays dans lequel l'user a le plus plongé
 * - [ ] Card: Année la plus active en nombre de plongées en top 3 (ex 2018: 20 plongées, 2016: 15 plongées, 2011: 10 plongées), Mois le plus actif en nombre de plongées (ex Mai 2018)
 * - [ ] Card: Top 5 des buddys avec lequel l'user a le plus plongé
 * - [ ] Liste des plongées (DataTable PrimeVue) https://primevue.org/datatable/
 *     - [x] Filtres backend (date, profondeur, durée, environnement)
 *     - [x] Tri client (PrimeVue natif)
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
          @day-click="(v: any) => { filterDate = v.date.toISOString().slice(0, 10); onFilterChange() }"
        />
      </PrimeFieldset>

      <div class="page-dives__stats">
        <!-- TODO: Card Top 5 pays -->
        <!-- TODO: Card Top 5 buddys -->
      </div>
    </header>

    <main class="page-dives__body">
      <h2 class="page-dives__title text-center my-4 font-semibold text-2xl">My dives list</h2>

      <PrimeDataTable
        :key="diveStore.filterKey"
        :value="diveStore.list"
        :scrollable="true"
        scrollHeight="300px"
        :virtualScrollerOptions="{ lazy: true, onLazyLoad: loadMoreDives, itemSize: 30 }"
      >
        <!-- ── Filtres backend ──────────────────────────────────────────────── -->
        <template #header>
          <div :style="{ display: 'flex', gap: '1rem', flexWrap: 'nowrap', alignItems: 'center' }">
            <PrimeInputText
              v-model="filterEnvironment"
              placeholder="Environment"
              @update:modelValue="onFilterChange"
            />
            <PrimeInputText
              v-model="filterDate"
              placeholder="Date (YYYY-MM-DD)"
              @update:modelValue="onFilterChange"
            />
            <PrimeInputNumber
              v-model="filterDepth"
              placeholder="Max depth (m)"    
              :minFractionDigits="1"          
              :min="0"              
              @input="onDepthChange"
            />
            <PrimeInputNumber
              v-model="filterDuration"
              placeholder="Duration (min)"
              :min="0"     
              @input="onDurationChange"         
            />
            <PrimeButton
              v-if="filterDate || filterDepth || filterDuration || filterEnvironment"
              icon="pi pi-times"
              label=""
              :style="{ width: '8rem',}"
              severity="secondary"
              @click="() => {
                filterDate = ''; filterDepth = null; filterDuration = null; filterEnvironment = '';
                onFilterChange()                                
              }"
            />
          </div>
        </template>

        <PrimeColumn field="divingEnvironment.label" header="Environment" :sortable="true" />
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
</style>