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
    color: "#00FFEF" // $turquoise
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

<style lang="scss" scoped>
.landing-features {
  padding: 6rem 1rem;
  background-color: $deep-navy;
  color: $white;

  .container {
    max-width: 1200px;
    margin: 0 auto;
  }

  &__header {
    text-align: center;
    margin-bottom: 4rem;
  }

  &__title {
    font-family: $font-playfair;
    font-size: 3rem;
    margin-bottom: 1rem;
    color: $white;
  }

  &__subtitle {
    font-family: $font-roboto;
    color: $stone-gray;
    font-size: 1.1rem;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }
}

.feature-card {
  background: rgba($white, 0.03);
  border: 1px solid rgba($white, 0.05);
  border-radius: 12px;
  padding: 2.5rem;
  text-align: center;
  transition: transform 0.3s ease, background 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    background: rgba($white, 0.06);
  }

  &__icon-wrapper {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    border: 2px solid;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1.5rem;
    font-size: 1.5rem;
  }

  &__title {
    font-family: $font-barlow;
    font-size: 1.5rem;
    margin-bottom: 1rem;
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }

  &__description {
    font-family: $font-roboto;
    color: darken($white, 20%);
    line-height: 1.6;
    font-size: 1rem;
  }
}
</style>
