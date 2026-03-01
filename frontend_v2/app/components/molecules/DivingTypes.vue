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

<style lang="scss" scoped>
.diving-types {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0.5rem 0;

  &__chip {
    cursor: pointer;
    transition: all 0.2s ease;
    user-select: none;
    border: 1px solid rgba(255, 255, 255, 0.05) !important;
    background: rgba(255, 255, 255, 0.03) !important;
    color: rgba(255, 255, 255, 0.6) !important;

    &:hover {
      background: rgba(255, 255, 255, 0.08) !important;
      border-color: rgba(255, 255, 255, 0.1) !important;
    }

    &.is-selected {
      background: rgba(0, 255, 239, 0.15) !important;
      border-color: rgba(0, 255, 239, 0.3) !important;
      color: #00FFEF !important;
      font-weight: 500;
    }
  }
}
</style>
