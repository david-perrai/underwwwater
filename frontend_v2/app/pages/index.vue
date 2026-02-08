<script setup lang="ts">
import Hero from '~/components/landing/Hero.vue';
import Features from '~/components/landing/Features.vue';
import Footer from '~/components/landing/Footer.vue';

definePageMeta({
  layout: "default",
});
</script>

<template>  
  <div class="landing-page">
    <Hero />
    <Features />
    <Footer />
  </div>
</template>

<style lang="scss" scoped>
.landing-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
