<script setup lang="ts">
import type { DivingType } from '~/composables/api/generated/model';

/** Datas */
const props = defineProps<{
  items: DivingType[];
}>();

const modelValue = defineModel<number[]>({ default: () => [] });

/** Actions */
const toggleType = (id: number) => {
  if (modelValue.value.includes(id)) {
    modelValue.value = modelValue.value.filter(t => t !== id);
  } else {
    modelValue.value.push(id);
  }
};

const isSelected = (id: number) => modelValue.value.includes(id);
</script>

<template>
  <div :class="['diving-types']" :data-id="'diving-types'">
    <PrimeChip
      v-for="type in props.items"
      :key="type.id"
      :label="type.label"
      :class="['diving-types__chip', { 'is-selected': isSelected(type.id) }]"
      @click="toggleType(type.id)"
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