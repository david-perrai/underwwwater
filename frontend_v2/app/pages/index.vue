<script setup lang="ts">
definePageMeta({
  layout: "landing",
});

const { t } = useI18n();

useHead({
  title: t('pages.home.title'),
  meta: [
    { name: 'description', content: t('pages.home.description') }
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
