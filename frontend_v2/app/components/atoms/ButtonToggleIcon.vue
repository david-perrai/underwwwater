<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean;
  onLabel: string;
  offLabel: string;
  onIcon: string;
  offIcon: string;
  ariaLabel: string;
}>();

/** Model */
const modelValue = defineModel<boolean>();
</script>

<template>
  <PrimeToggleButton 
    v-model="modelValue" 
    :onLabel="onLabel" 
    :offLabel="offLabel" 
    :onIcon="onIcon" 
    :offIcon="offIcon" 
    :aria-label="ariaLabel" 
    :class="['button', 'button-toggle-icon']"
    :data-id="'button-toggle-icon'"
  />
</template>
