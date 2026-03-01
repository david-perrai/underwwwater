<script setup lang="ts">
import { DIVING_ENVIRONMENTS } from '~/types/DivingType';

/** Props */
const modelValue = defineModel<string | null>({ default: null });

/** Functions */
const selectEnvironment = (token: string) => {
  modelValue.value = modelValue.value === token ? null : token;
};

const isSelected = (token: string) => modelValue.value === token;
</script>

<template>
  <div :class="['diving-environments']" :data-id="'diving-environments'">
    <PrimeChip
      v-for="env in DIVING_ENVIRONMENTS"
      :key="env.token"
      :label="env.label"
      :class="['diving-environments__chip', { 'is-selected': isSelected(env.token) }]"
      @click="selectEnvironment(env.token)"
    />
  </div>
</template>
