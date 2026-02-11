<script setup lang="ts">
const props = defineProps<{
  label: string;
  icon?: string;
  to?: string;
  variant?: "primary" | "secondary" | "outline";
}>();
</script>

<template>
  <NuxtLink v-if="to" :to="to" class="btn-link">
    <PVButton :label="label" :icon="icon" :class="['custom-btn', `is-${variant || 'primary'}`]" />
  </NuxtLink>
  <PVButton v-else :label="label" :icon="icon" :class="['custom-btn', `is-${variant || 'primary'}`]" />
</template>

<style lang="scss" scoped>
@use "sass:color";

.btn-link {
  text-decoration: none;
}

.custom-btn {
  font-family: $font-barlow;
  text-transform: uppercase;
  letter-spacing: 1px;
  border-radius: 4px;
  padding: 0.75rem 2rem;
  font-weight: 600;
  transition: all 0.3s ease;

  &.is-primary {
    background: $color-turquoise;
    color: $color-navy;
    border: 1px solid $color-turquoise;

    &:hover {
      background: color.scale($color-turquoise, $lightness: 10%);
      border-color: color.scale($color-turquoise, $lightness: 10%);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba($color-turquoise, 0.3);
    }
  }

  &.is-secondary {
    background: transparent;
    color: $color-white;
    border: 1px solid $color-white;

    &:hover {
      background: rgba($color-white, 0.1);
      transform: translateY(-2px);
    }
  }
}
</style>
