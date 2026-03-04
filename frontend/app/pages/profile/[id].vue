<script setup lang="ts">
/**
 * TODO: Roadmap des fonctionnalités de la page Profil Public
 * Ce sera une page SSR, publique, elle permettra de consulter différents profils de plongeurs.

    Ce sera une page accessible pour les autres. Pour soi meme elle n'aura que peu d'intéret puisqu'elle fera un mix plus light des pages dives + dashboard (peut être un peu moins de graphiques que sur ma page perso dashboard) mais permettra à tout à chacun de disposer d'un lien pour se présenter à la communauté avec un url public.

    Elle sera composé des graphs des pages dives et dahboard en gros, une sorte de mix.
    
 * - [ ] Page SSR publique pour consulter les profils des plongeurs
 * - [ ] Card Profile: avatar, pseudonyme, nationalité, niveau, stats globales
 * - [ ] Section: Heatmap des plongées
 * - [ ] Section: Statistiques clés (mix de dashboard: durées, profondeurs, etc.)
 * - [ ] Section: Liste des dernières plongées (version 'light' de dives.vue)
 */
</script>

<template>
  <div class="page-profile">
    <header class="page-profile__header">
      <!-- TODO: Card Profile (avatar, pseudonyme, nationalité, etc.) -->
    </header>

    <main class="page-profile__body">
      <section class="page-profile__heatmap">
        <!-- TODO: Calendar Heatmap -->
      </section>

      <section class="page-profile__stats">
        <!-- TODO: Statistiques clés (depths, durations, consumption) -->
      </section>

      <section class="page-profile__dives">
        <!-- TODO: Liste des plongées (DataTable light) -->
      </section>
    </main>
  </div>
</template>

<style scoped lang="scss">
.page-profile {}
</style>