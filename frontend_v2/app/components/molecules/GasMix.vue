<script setup lang="ts">
import type { GasMix } from '~/types/GasMix';

const props = defineProps<{
  initialPressureStart?: number;
  initialPressureEnd?: number;
  initialMix?: Partial<GasMix>;
}>();

const emit = defineEmits<{
  save: [data: { pressureStart: number; pressureEnd: number; gasMix: GasMix }];
}>();

const { 
  gasMix, 
  isOxygenDisabled, 
  isNitrogenDisabled, 
  isHeliumDisabled, 
  updateGas 
} = useGasMixBalance(props.initialMix);

const { title, subtitle, isBreathable } = useGasMixName(gasMix);

const pressureStart = ref(props.initialPressureStart ?? 200);
const pressureEnd = ref(props.initialPressureEnd ?? 50);

const { t } = useI18n();

const isValid = computed(() => {
  return (
    pressureStart.value > 0 &&
    pressureEnd.value <= pressureStart.value
  );
});

const handleSubmit = () => {
  if (isValid.value) {
    emit('save', {
      pressureStart: pressureStart.value,
      pressureEnd: pressureEnd.value,
      gasMix: { ...gasMix },
    });
  }
};
</script>

<template>
  <div :class="['gas-panel']">
    <div class="gas-panel__header">
      <strong class="gas-panel__title">
        {{ title }} 
        <span v-if="subtitle">{{ subtitle }}</span>
      </strong>
    </div>
    
    <div class="gas-panel__grid">
      <GasControl
        id="o2"
        label="Oxygen (O2)"
        :model-value="gasMix.oxygen"
        v-model:locked="isOxygenDisabled"
        color="primary"
        @update:model-value="(v) => updateGas('oxygen', v)"
      />

      <GasControl
        id="n2"
        label="Nitrogen (N2)"
        :model-value="gasMix.nitrogen"
        v-model:locked="isNitrogenDisabled"
        color="secondary"
        @update:model-value="(v) => updateGas('nitrogen', v)"
      />

      <GasControl
        id="he"
        label="Helium (He)"
        :model-value="gasMix.helium"
        v-model:locked="isHeliumDisabled"
        color="warn"
        @update:model-value="(v) => updateGas('helium', v)"
      />
    </div>

    <!-- Pressure Fields -->
    <div class="gas-panel__pressure">
      <div class="field">
        <label for="pressureStart">{{ $t('dive.gas.pressureStart') }}</label>
        <PVInputNumber
          id="pressureStart"
          v-model="pressureStart"
          suffix=" bar"
          :min="1"
        />
      </div>
      <div class="field">
        <label for="pressureEnd">{{ $t('dive.gas.pressureEnd') }}</label>
        <PVInputNumber
          id="pressureEnd"
          v-model="pressureEnd"
          suffix=" bar"
          :min="0"
          :max="pressureStart"
        />
      </div>
    </div>
    <div v-if="pressureEnd > pressureStart" class="text-error text-sm mt-1">
      {{ $t('dive.gas.pressureError') }}
    </div>

    <!-- Submit Button -->
    <div class="gas-panel__actions mt-4 flex justify-end">
      <Button
        :label="$t('dive.gas.submit')"
        severity="success"
        :disabled="!isValid"
        @click="handleSubmit"
      />
    </div>
  </div>
</template>


