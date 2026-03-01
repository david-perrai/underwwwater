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
  <div :class="['gas-control']" :color="color">
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

      <PrimeInputNumber 
        :model-value="modelValue" 
        class="field-number-slim" 
        input-class="field-number-slim__inner"
        :min="0" 
        :max="100"
        :disabled="locked"
        suffix="%"
        :style="{ width: '65px' }"
        :data-id="'field-number-slim'"
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

<style lang="scss">
.gas-control {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.75rem;
  padding: 2rem;
  border-radius: 1.5rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.03);
  position: relative;
  overflow: hidden;
  width: 200px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: var(--gas-color);
  }

  &[color="primary"] {
    --gas-color: #00FFEF;
  }

  &[color="secondary"] {
    --gas-color: #244cff;
  }

  &[color="warn"] {
    --gas-color: #FFD600;
  }

  &:hover:not(.gas-control--locked) {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.1);
    box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.3);
  }

  &--locked {
    opacity: 0.5;
    background: rgba(0, 0, 0, 0.2);
    filter: grayscale(0.5);

    .gas-control__label {
      color: rgba(255, 255, 255, 0.4);
    }
  }

  &__label {
    font-family: $font-inter;
    font-size: 1rem;
    color: $color-white;
  }

  &__inner {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    width: 100%;
    justify-content: center;
    position: relative;

    .p-knob-text {
      display: none;
    }

    .field-number-slim {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }

    .gas-control__lock {
      position: absolute;
      bottom: 0;
    }
  }
}

.field-number-slim {
  &__inner {
    width: -webkit-fill-available;
    max-width: 60px;
    font-family: $font-inter;
    font-size: 1rem;
    padding: 0.5rem;
    text-align: center;
    border: none;
    background-color: transparent;
    cursor: pointer;
    border-radius: 0%;
    color: inherit;

    &:focus {
      border-bottom: 1px solid var(--gas-color, currentColor) !important;
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }
}
</style>