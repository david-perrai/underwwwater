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
const onUpdateValue = (value: number | null | undefined) => {
  emit('update:modelValue', value || 0);
};

const onToggleLock = (value: boolean | undefined) => {
  emit('update:locked', value || false);
};
</script>

<template>
  <div :class="['gas-control', 'field']" :color="color">
    <label class="gas-control__label">
      {{ label }}
    </label>

    <div class="gas-control__inner">
      <PrimeKnob 
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

      <FieldNumberSlim 
        :model-value="modelValue" 
        :min="0" 
        :max="100"
        :disabled="locked"
        :suffix="'%'"
        @update:model-value="onUpdateValue"
      />

      <div class="gas-control__lock">
        <ButtonToggleIcon 
          :model-value="locked"
          :onLabel="'Locked'" 
          :offLabel="'Unlocked'" 
          :onIcon="'pi pi-lock'" 
          :offIcon="'pi pi-lock-open'" 
          :ariaLabel="'Lock or Unlock Gas'" 
          unstyled
          @update:model-value="onToggleLock"
        />  
      </div>
    </div>
  </div>
</template>

