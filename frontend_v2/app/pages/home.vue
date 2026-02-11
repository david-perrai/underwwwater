<script setup lang="ts">
definePageMeta({
  layout: "landing",
});

useHead({
  title: 'Underwater - Dive Log & Statistics',
  meta: [
    { name: 'description', content: 'Track your dives, analyze your stats, and explore the underwater world with Underwater.' }
  ]
});
</script>

<template>  
  <div class="landing-page">
    <LandingHero />
    <LandingFeatures />
    <LandingFooter />
  </div>
</template>

<style lang="scss">
// Global overrides for landing page specific needs if any
.landing-page {
  width: 100%;
  min-height: 100vh;
  background-color: $color-navy;
}
</style>
