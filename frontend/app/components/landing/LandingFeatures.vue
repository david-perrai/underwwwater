<script setup lang="ts">
/** Composables */
const { t } = useI18n();

/** Computeds */
const features = computed(() => [
  {
    title: t('landing.features.detailedLogs.title'),
    description: t('landing.features.detailedLogs.description'),
    icon: "pi pi-book", 
    color: "#8DDCD4" // $greeny-blue
  },
  {
    title: t('landing.features.statistics.title'),
    description: t('landing.features.statistics.description'),
    icon: "pi pi-chart-line",
    color: "#00FFEF" // $color-turquoise
  },
  {
    title: t('landing.features.community.title'),
    description: t('landing.features.community.description'),
    icon: "pi pi-globe",
    color: "#FF0010" // $red (using variable approximation for illustrative purpose against dark bg)
  }
]);
</script>

<template>
  <section id="features" class="landing-features">
    <div class="container">
      <div class="landing-features__header">
        <h2 class="landing-features__title">{{ $t('landing.features.title') }}</h2>
        <p class="landing-features__subtitle">{{ $t('landing.features.subtitle') }}</p>
      </div>

      <div class="landing-features__grid">
        <div 
          v-for="(feature, index) in features" 
          :key="index" 
          class="feature-card"
        >
          <div class="feature-card__icon-wrapper" :style="{ borderColor: feature.color }">
            <i :class="feature.icon" :style="{ color: feature.color }"></i>
          </div>
          <h3 class="feature-card__title">{{ feature.title }}</h3>
          <p class="feature-card__description">{{ feature.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.landing-features {
  padding: 4rem 0;
  background-color: #050a20;
  color: #ffffff;

  &__header {
    text-align: center;
    margin-bottom: 3rem;
  }

  &__title {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    background: linear-gradient(to right, #00FFEF, #244cff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  &__subtitle {
    font-size: 1.25rem;
    color: rgba(#ffffff, 0.7);
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }
}

.feature-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 1.5rem;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.2);
    transform: translateY(-10px);
    box-shadow: 0 15px 30px -5px rgba(0, 0, 0, 0.5);
  }

  &__icon-wrapper {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: 2px solid;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1.5rem;
    background: rgba(255, 255, 255, 0.05);

    i {
      font-size: 2rem;
    }
  }

  &__title {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }

  &__description {
    font-size: 1rem;
    color: rgba(#ffffff, 0.7);
    line-height: 1.6;
  }
}
</style>