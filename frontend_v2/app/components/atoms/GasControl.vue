<script setup lang="ts">
/** Props */
const props = defineProps<{
  label: string;
  modelValue: number;
  locked: boolean;
  color: 'primary' | 'secondary' | 'warn';
  id: string;
}>();

/** Emits */
const emit = defineEmits<{
  'update:modelValue': [value: number];
  'update:locked': [value: boolean];
}>();

/** Methods */
const onUpdateValue = (value: number) => {
  emit('update:modelValue', value);
};

const onToggleLock = (value: boolean) => {
  emit('update:locked', value);
};
</script>

<template>
  <div :class="['gas-control', { 'gas-control--locked': locked }, 'field']" :color="color">
    <label class="gas-control__label">
      {{ label }}
    </label>


    <div class="gas-control__inner">
    <PVKnob 
      :model-value="modelValue" 
      :size="150" 
      :min="0"
      :max="100"
      value-template="{value}%"
      :value-color="color === 'primary' ? '#00FFEF' : color === 'secondary' ? '#244cff' : '#FFD600'"
      :range-color="color === 'primary' ? 'rgba(0, 255, 239, 0.1)' : color === 'secondary' ? 'rgba(36, 76, 255, 0.1)' : 'rgba(255, 214, 0, 0.1)'"
      :readonly="locked"
      @update:model-value="onUpdateValue"
    />

    <PVInputNumber 
      :model-value="modelValue" 
      mode="decimal" 
      suffix="%" 
      class="gas-control__input" 
      input-class="gas-control__input-inner"
      :min="0" 
      :max="100"
      :disabled="locked"
      @update:model-value="(v) => onUpdateValue(v || 0)"
    />

    </div>

    <div class="gas-control__lock">
      <PVCheckbox :model-value="locked" :binary="true" :input-id="`lock-${id}`" @update:model-value="onToggleLock" />
      <label :for="`lock-${id}`">Locked</label>
    </div>
  </div>
</template>

