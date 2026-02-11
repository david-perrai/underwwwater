<script setup lang="ts">
const features = [
  {
    title: "Detailed Dive Logs",
    description: "Record every detail of your underwater journey. Depth, duration, location, and equipment - keep it all organized.",
    icon: "pi pi-book", 
    color: "#8DDCD4" // $greeny-blue
  },
  {
    title: "Advanced Statistics",
    description: "Visualize your progress with comprehensive charts. Track your bottom time, depth trends, and more.",
    icon: "pi pi-chart-line",
    color: "#00FFEF" // $color-turquoise
  },
  {
    title: "Community & Sharing",
    description: "Share your best dives with friends or the community. Discover new spots and get inspired.",
    icon: "pi pi-globe",
    color: "#FF0010" // $red (using variable approximation for illustrative purpose against dark bg)
  }
];
</script>

<template>
  <section id="features" class="landing-features">
    <div class="container">
      <div class="landing-features__header">
        <h2 class="landing-features__title">Why Choose Underwater?</h2>
        <p class="landing-features__subtitle">Everything you need to capture your aquatic experiences.</p>
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

