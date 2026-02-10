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

<style lang="scss" scoped>
.landing-hero {
  position: relative;
  height: 100vh;
  width: 100%;
  background-image: url('/bg2.webp');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  &__overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to bottom,
      rgba($color-navy, 0.3) 0%,
      rgba($color-navy, 0.6) 50%,
      $color-navy 100%
    );
    z-index: 1;
  }

  &__content {
    position: relative;
    z-index: 2;
    text-align: center;
    max-width: 800px;
    padding: 0 2rem;
    animation: fadeUp 1s ease-out;
  }

  &__title {
    font-family: $font-playfair;
    font-size: 4rem;
    color: $white;
    margin-bottom: 1.5rem;
    line-height: 1.2;
    
    @media (max-width: 768px) {
      font-size: 2.5rem;
    }

    .highlight {
      color: $color-turquoise;
      font-style: italic;
    }
  }

  &__subtitle {
    font-family: $font-roboto;
    font-size: 1.25rem;
    color: rgba($white, 0.9);
    margin-bottom: 3rem;
    line-height: 1.6;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }

  &__actions {
    display: flex;
    gap: 1.5rem;
    justify-content: center;
    
    @media (max-width: 480px) {
      flex-direction: column;
      gap: 1rem;
    }
  }

  &__scroll-indicator {
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
    color: rgba($white, 0.7);
    font-size: 2rem;
    animation: bounce 2s infinite;
  }
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateX(-50%) translateY(0);
  }
  40% {
    transform: translateX(-50%) translateY(-10px);
  }
  60% {
    transform: translateX(-50%) translateY(-5px);
  }
}
</style>
