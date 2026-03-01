<script setup lang="ts">
import { useDiveStore, CALL_ONCE_HEATMAP, CALL_ONCE_STATS } from '~/stores/dive'

// ─── Meta ─────────────────────────────────────────────────────────────────────
// definePageMeta({ middleware: 'auth' })
useHead({ title: 'Dashboard — DiveLog' })

// ─── Store ────────────────────────────────────────────────────────────────────
const diveStore = useDiveStore()
const year      = new Date().getFullYear()
const userStore = useUserStore()

//TODO Existe t'il un autre moyen de faire ça plutôt que que sur chaque page ?
if(!userStore.isLoggedIn) {
  navigateTo('/login');
}

/**
 * callOnce : s'exécute une seule fois par session (SSR + hydratation inclus).
 * Même si l'utilisateur navigue entre /dashboard et /dives et revient,
 * ces fetches ne se redéclenchent pas — le store garde le cache.
 *
 * La double protection "store guard (isYearCached / statsFetched) + callOnce"
 * couvre aussi le cas d'un SSR où le state serait déjà hydraté côté client.
 */
// On charge n et n-1 en parallèle dès le départ pour couvrir toute la fenêtre
await callOnce(CALL_ONCE_HEATMAP(year),      () => diveStore.fetchHeatmapYear(year))
await callOnce(CALL_ONCE_HEATMAP(year - 1),  () => diveStore.fetchHeatmapYear(year - 1))
await callOnce(CALL_ONCE_STATS,              () => diveStore.fetchStats())
</script>

<template>
  <div class="dashboard-page">
    <h1>Dashboard</h1>
    <h2>{{ userStore.user?.username }}</h2>
    <p>List of dives will go here.</p>
    https://app.diagrams.net/?src=about#G1HlZAEeKFjx8ZRrJ3cQEFvqyG1FqJ4-vz#%7B%22pageId%22%3A%22Xp9XIThnklZw_WTEFrcx%22%7D


    <!-- ── Heatmap ────────────────────────────────────────────────────────── -->
    <PrimeFieldset :legend="'Globals'" :class="['form__fieldset--flex']">
      <Heatmap />
    </PrimeFieldset>
  </div>
</template>