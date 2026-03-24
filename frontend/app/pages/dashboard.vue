<script setup lang="ts">
import { useDiveStore, CALL_ONCE_HEATMAP, CALL_ONCE_STATS } from '~/stores/dive'

// ─── Meta ─────────────────────────────────────────────────────────────────────
definePageMeta({ middleware: 'auth' })
useHead({ title: 'Dashboard — DiveLog' })

// ─── Store ────────────────────────────────────────────────────────────────────
const diveStore = useDiveStore()
const year      = new Date().getFullYear()
const userStore = useUserStore()


/**
 * Même si l'utilisateur navigue entre /dashboard et /dives et revient,
 * ces fetches se redéclenchent pour garantir des données à jour.
 */
await diveStore.fetchHeatmapYear(year)
await diveStore.fetchHeatmapYear(year - 1)
await callOnce(CALL_ONCE_STATS,              () => diveStore.fetchStats())

/**
 * TODO: Roadmap des fonctionnalités de la page Dashboard
 * - [ ] Première Strate / Header:
 *     - [ ] Titre de page centré "Dashboard" / "Tableau de bord"
 *     - [ ] Card profile: avatar, pseudonyme, nationalité, niveau fessm/padi/ssi/cmas (v2), total plongées, dates first/last dive
 * - [ ] Strate "Durées":
 *     - [ ] Card: plongée la plus courte, top 5 plus longues, temps total sous l'eau (somme de toutes les plongées), temps moyen sous l'eau (moyenne sur toutes les plongées)
 *     - [ ] Chart camembert (tranches 10mn)
 * - [ ] Strate "Profondeurs":
 *     - [ ] Card: top 5 des plongées les plus profondes
 *     - [ ] Chart camembert (tranches 10mètres)
 * - [ ] Strate "Consommation":
 *     - [ ] Chart camembert 'mix les plus utilisés' (%)
 *     - [ ] Card: nb plongées multi-tanks, consommation moyenne / plongée en bar, plongée la plus économe en gas (record bar / temps de plongée)
 * - [ ] Strate "Themes":
 *     - [ ] Graph types de plongées (épave, nuit, cave, etc.)
 *     - [ ] Chart camembert rôles (explo, divemaster, etc.)
 *     - [ ] Chart camembert environnements (mer, lac, cenote, etc.)
 */
</script>

<template>
  <div class="page-dashboard">
    <header class="page-dashboard__header">
      <!-- TODO: Titre de page centré "Dashboard" / "Tableau de bord" -->
      
      <!-- TODO: Card profile (avatar, pseudonyme, nationalité, niveau, stats globales) -->
    </header>

    <section class="page-dashboard__durations">
      <!-- TODO: Card stats durées (plus courte, top 5 longues, total, moyenne) -->
      <!-- TODO: Chart camembert tranches 10mn -->
    </section>

    <section class="page-dashboard__depths">
      <!-- TODO: Card top 5 plus profondes -->
      <!-- TODO: Chart camembert tranches 10m -->
    </section>

    <section class="page-dashboard__consumption">
      <!-- TODO: Chart camembert mix utilisés -->
      <!-- TODO: Card stats conso (multi-tanks, conso moyenne bar) -->
    </section>

    <section class="page-dashboard__themes">
      <!-- TODO: Graph types de plongées (épave, nuit, cave, etc.) -->
      <!-- TODO: Chart camembert rôles (explo, divemaster, etc.) -->
      <!-- TODO: Chart camembert environnements (mer, lac, cenote, etc.) -->
    </section>
  </div>
</template>

<style scoped lang="scss">
.page-dashboard {}
</style>