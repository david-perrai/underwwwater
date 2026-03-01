<script setup lang="ts">
import { DIVING_TYPES } from '~/types/DivingType';

/** Props */
const modelValue = defineModel<string[]>({ default: () => [] });

/** Functions */
const toggleType = (token: string) => {
  if (modelValue.value.includes(token)) {
    modelValue.value = modelValue.value.filter(t => t !== token);
  } else {
    modelValue.value.push(token);
  }
};

const isSelected = (token: string) => modelValue.value.includes(token);
</script>

<template>
  <div :class="['diving-types']" :data-id="'diving-types'">
    <PrimeChip
      v-for="type in DIVING_TYPES"
      :key="type.token"
      :label="type.label"
      :class="['diving-types__chip', { 'is-selected': isSelected(type.token) }]"
      @click="toggleType(type.token)"
    />
  </div>
</template>
