<script setup lang="ts">
import type { SelectChipItem } from "~/types/components/SelectChipItem";

/** Datas */
const props = defineProps<{
  items: SelectChipItem[];
}>();

const modelValue = defineModel<number | string | null>({ default: null });

/** Actions */
const selectEnvironment = (id: number | string) => {
  modelValue.value = modelValue.value === id ? null : id;
};

const isSelected = (id: number | string) => modelValue.value === id;
</script>

<template>
  <div :class="['select-chip']" :data-id="'select-chip'">
    <PrimeChip
      v-for="env in items"
      :key="env.id"
      :label="env.label"
      :class="['select-chip__chip', { 'is-selected': isSelected(env.id) }]"
      @click="selectEnvironment(env.id)"
    />
  </div>
</template>

<style lang="scss" scoped>
.select-chip {
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
      background: rgba(0, 196, 180, 0.15) !important;
      border-color: rgba(0, 196, 180, 0.3) !important;
      color: #00c4b4 !important;
      font-weight: 500;
    }
  }
}
</style>
