<script setup lang="ts">
/** Props */
const props = defineProps<{
  isSmall?: boolean;
}>();
/** Datas */

/** Stores and Composables */

/** Computeds */

/** Functions */

/** Lifecyle Hooks */
</script>

<template>
  <div 
    :class="['logo', { 'logo--small': props.isSmall }]" 
    :data-id="'logo'"
  >
    under<span :class="['logo__highlight']">www</span>ater
  </div>
</template>

<style lang="scss" scoped>
.logo {
  font-family: 'Playfair Display', serif;
  font-size: 4rem;
  color: #ffffff;
  line-height: 1.2;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }

  &__highlight {
    color: #00FFEF;
    font-style: normal;
    font-family: 'Inter Tight', sans-serif;
  }

  &--small {
    font-size: 1.25rem;
  }
}
</style>