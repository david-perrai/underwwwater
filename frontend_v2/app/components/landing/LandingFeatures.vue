<script setup lang="ts">
const { t } = useI18n();

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

