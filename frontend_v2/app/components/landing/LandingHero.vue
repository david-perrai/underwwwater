<script setup lang="ts">
// No script needed for now, static content
</script>

<template>
  <section class="landing-hero">
    <div class="landing-hero__overlay"></div>
    <div class="landing-hero__content">

      <Logo />

      <h1 class="landing-hero__title">
        Explore the <span class="highlight">Unseen</span>
      </h1>
      <p class="landing-hero__subtitle">
        Your ultimate companion for underwater adventures. Log dives, track stats, and discover the depths.
      </p>
      
      <div class="landing-hero__actions">
        <BaseButton label="Start Logging" to="/login" variant="primary" icon="pi pi-arrow-right" />
        <BaseButton label="Learn More" to="#features" variant="secondary" />
      </div>
    </div>
    
    <div class="landing-hero__scroll-indicator">
      <i class="pi pi-angle-down"></i>
    </div>
  </section>
</template>

