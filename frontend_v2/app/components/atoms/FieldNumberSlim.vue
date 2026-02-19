<script setup lang="ts">
/** Props */
const props = withDefaults(defineProps<{
  min?: number;
  max?: number;
  disabled?: boolean;
  placeholder?: string;
  suffix?: string;
}>(), {
  min: 0,
  max: 100,
  disabled: false,
});

/** Model */
const modelValue = defineModel<number | null>();
</script>

<template>
  <PVInputNumber 
    v-model="modelValue" 
    class="field-number-slim" 
    input-class="field-number-slim__inner"
    :min="min" 
    :max="max"
    :disabled="disabled"
    :placeholder="placeholder"
    :suffix="suffix"
    :data-id="'field-number-slim'"
  />
</template>
