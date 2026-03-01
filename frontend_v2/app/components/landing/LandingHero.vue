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
        <PrimeButton
          :severity="'primary'" 
          :size="'large'" 
          variant="plain" 
          asChild
          v-slot="slotProps"
        >
          <RouterLink to="/login" v-bind="slotProps" class="p-button--jumping">
            {{ $t('landing.hero.startLogging') }}
          </RouterLink>
        </PrimeButton>

        <PrimeButton
          :label="$t('landing.hero.learnMore')" 
          :severity="'contrast'" 
          :size="'large'"
          class="p-button--jumping" 
          variant="plain" 
        />
      </div>
    </div>
    
    <div class="landing-hero__scroll-indicator">
      <i class="pi pi-angle-down"></i>
    </div>
  </section>
</template>

<style lang="scss">
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
  text-align: center;
  overflow: hidden;

  &__overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to bottom,
      rgba(#050a20, 0.6) 0%,
      rgba(#050a20, 0.8) 50%,
      rgba(#050a20, 0.9) 100%
    );
    z-index: 1;
  }

  &__content {
    position: relative;
    z-index: 2;
    max-width: 800px;
    padding: 0 1rem;
    animation: fadeInUp 1s ease-out;
  }

  &__title {
    font-size: 4rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    line-height: 1.1;
    color: #ffffff;

    @media (max-width: 768px) {
      font-size: 2.5rem;
    }

    .highlight {
      color: #00FFEF;
      text-shadow: 0 0 20px rgba(#00FFEF, 0.3);
    }
  }

  &__subtitle {
    font-size: 1.5rem;
    color: rgba(#ffffff, 0.8);
    margin-bottom: 3rem;
    line-height: 1.6;

    @media (max-width: 768px) {
      font-size: 1.1rem;
    }
  }

  &__actions {
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    flex-wrap: wrap;

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: center;
    }
  }

  &__scroll-indicator {
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
    animation: bounce 2s infinite;
    color: #ffffff;
    font-size: 1.5rem;
    cursor: pointer;

    i {
      opacity: 0.8;
    }
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(50px);
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
