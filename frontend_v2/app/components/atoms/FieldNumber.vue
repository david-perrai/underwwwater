<script setup lang="ts">
/** Props */
const props = defineProps<{
  id: string;
  label: string;
  error?: string;
  disabled?: boolean;
  min?: number;
  max?: number;
  maxFractionDigits?: number;
  minFractionDigits?: number;
}>();

/** Model */
const modelValue = defineModel<number | null>();

/** Emits */
const emit = defineEmits(['update:modelValue']);

/** Functions */
const onUpdate = (value: any) => {
  emit('update:modelValue', value);
};
</script>

<template>
  <div :class="['field-number']" :data-id="'field-number-' + id">
    <PrimeFloatLabel>
      <PrimeInputNumber
        :inputId="'field-number-' + id"
        v-model="modelValue"
        :fluid="true"
        :disabled="disabled"
        :min="min"
        :max="max"
        :maxFractionDigits="maxFractionDigits"
        :minFractionDigits="minFractionDigits"
        :class="{ 'p-invalid': error }"
        @update:model-value="onUpdate"
      />

      <label :for="'field-number-' + id">{{ label }}</label>
    </PrimeFloatLabel>
    
    <small v-if="error" class="p-error">{{ error }}</small>
  </div>
</template>
