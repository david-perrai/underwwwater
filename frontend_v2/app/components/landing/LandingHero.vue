<script setup lang="ts">
// No script needed for now, static content
</script>

<template>
  <section class="landing-hero">
    <div class="landing-hero__overlay"></div>
    <div class="landing-hero__content">

      <Logo />

      <h1 class="landing-hero__title">
        {{ $t('landing.hero.title') }} <span class="highlight">{{ $t('landing.hero.titleHighlight') }}</span>
      </h1>
      <p class="landing-hero__subtitle">
        {{ $t('landing.hero.subtitle') }}
      </p>
      
      <div class="landing-hero__actions">
        <BaseButton :label="$t('landing.hero.startLogging')" to="/login" variant="primary" icon="pi pi-arrow-right" />
        <BaseButton :label="$t('landing.hero.learnMore')" to="#features" variant="secondary" />
      </div>
    </div>
    
    <div class="landing-hero__scroll-indicator">
      <i class="pi pi-angle-down"></i>
    </div>
  </section>
</template>

