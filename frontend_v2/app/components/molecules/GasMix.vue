<script setup lang="ts">
import type { GasMix } from '~/types/GasMix';

const props = defineProps<{
  initialPressureStart?: number;
  initialPressureEnd?: number;
  initialMix?: Partial<GasMix>;
  closable?: boolean;
}>();

const emit = defineEmits<{
  save: [data: { pressureStart: number; pressureEnd: number; gasMix: GasMix }];
  close: [];
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
  <div :class="['gas-mix']">
    <div class="gas-mix__header flex justify-between items-center mb-4">
      <strong class="gas-mix__title">
        {{ title }} 
        <span v-if="subtitle" class="opacity-70 ml-1">{{ subtitle }}</span>
      </strong>
      <PrimeButton
        v-if="closable"
        icon="pi pi-times"
        severity="contrast"
        variant="text"
        rounded
        size="small"
        @click="emit('close')"
        aria-label="Close"
      />
    </div>
    
    <div class="gas-mix__grid">
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
    <div class="gas-mix__pressure">
      <div class="field">
        <label for="pressureStart">{{ $t('dive.gas.pressureStart') }}</label>
        <PrimeInputNumber
          id="pressureStart"
          v-model="pressureStart"
          suffix=" bar"
          :min="1"
        />
      </div>
      <div class="field">
        <label for="pressureEnd">{{ $t('dive.gas.pressureEnd') }}</label>
        <PrimeInputNumber
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
    <div class="gas-mix__actions mt-4 flex justify-end">
      <PrimeButton
        :label="$t('dive.gas.submit')"
        severity="success"
        :disabled="!isValid"
        @click="handleSubmit"
      />
    </div>
  </div>
</template>


