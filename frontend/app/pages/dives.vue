<script setup lang="ts">
import { useDiveStore, CALL_ONCE_HEATMAP, CALL_ONCE_LIST } from '~/stores/dive'

// ─── Meta ─────────────────────────────────────────────────────────────────────
useHead({ title: 'Mes plongées — DiveLog' })
definePageMeta({ middleware: 'auth' })

// ─── Store ────────────────────────────────────────────────────────────────────
const diveStore = useDiveStore()
const year      = new Date().getFullYear()

/**
 * Les données de la heatmap sont récupérées à chaque chargement de la page
 * pour garantir leur actualité.
 */
await diveStore.fetchHeatmapYear(year)
await diveStore.fetchHeatmapYear(year - 1)
await callOnce(CALL_ONCE_LIST,               () => diveStore.fetchList())


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
 *     - [x] Scroll infini ou pagination
 *     - [ ] Groupement par pays
 *     - [x] Recherche globale
 */
</script>

<template>
  <div class="page-dives">
    <header class="page-dives__header">
      <!-- TODO: Titre de page centré "Divelog" / "Liste des plongées" -->

      <!-- ── Heatmap ────────────────────────────────────────────────────────── -->
      <PrimeFieldset :legend="'Heatmap'">
        <Heatmap
          tooltip-unit="plongées"
        />
      </PrimeFieldset>

      <div class="page-dives__stats">
        <!-- TODO: Card Top 5 pays -->
        <!-- TODO: Card Top 5 buddys -->
      </div>
    </header>

    <main class="page-dives__body">     
      <TableDive />
    </main>
  </div>
</template>

<style scoped lang="scss">
</style>