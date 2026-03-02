<script setup lang="ts">
import type { GasMix } from '~/types/GasMix';

/** Types */
interface TankModel {
  pressureStart: number;
  pressureEnd: number;
  gasMix: GasMix;
}

/** Props */
const props = defineProps<{
  closable?: boolean;
}>();

/** Emits */
const emit = defineEmits<{ close: [] }>();

/** Datas */
const model = defineModel<TankModel>({ required: true });

/** Composables */
const { gasMix, isOxygenDisabled, isNitrogenDisabled, isHeliumDisabled, updateGas } = useGasMixBalance(model.value.gasMix);

/** Computeds */
const pressureStart = computed({
  get: () => model.value.pressureStart,
  set: (v) => model.value = { ...model.value, pressureStart: v },
});

const pressureRange = computed({
  get: () => [model.value.pressureEnd, model.value.pressureStart],
  set: (v) => {
    if (Array.isArray(v)) {
      let end = v[0] ?? model.value.pressureEnd;
      let start = v[1] ?? model.value.pressureStart;

      // Enforce start > end
      if (start <= end) {
        if (start < 300) {
          start = end + 1;
        } else {
          end = 299;
          start = 300;
        }
      }

      model.value = {
        ...model.value,
        pressureEnd: end,
        pressureStart: start,
      };
    }
  },
});

/** Actions */
const handleUpdateGas = (key: keyof GasMix, value: number) => {
  updateGas(key, value);
  model.value = { ...model.value, gasMix: { ...gasMix } };
};
</script>

<template>
  <div class="gas-mix">
    <div class="gas-mix__balance">
      <GasControl
        id="o2"
        label="Oxygen (O2)"
        :model-value="gasMix.oxygen"
        v-model:locked="isOxygenDisabled"
        color="primary"
        @update:model-value="(v) => handleUpdateGas('oxygen', v)"
      />
      <GasControl
        id="n2"
        label="Nitrogen (N2)"
        :model-value="gasMix.nitrogen"
        v-model:locked="isNitrogenDisabled"
        color="secondary"
        @update:model-value="(v) => handleUpdateGas('nitrogen', v)"
      />
      <GasControl
        id="he"
        label="Helium (He)"
        :model-value="gasMix.helium"
        v-model:locked="isHeliumDisabled"
        color="warn"
        @update:model-value="(v) => handleUpdateGas('helium', v)"
      />
    </div>

    <div class="gas-mix__pressure">
      <div class="gas-mix__pressure-labels">
        <div class="pressure-label">
          <span class="pressure-label__title">End Pressure</span>
          <span class="pressure-label__value">{{ model.pressureEnd }} bar</span>
        </div>
        <div class="pressure-label pressure-label--end text-right">
          <span class="pressure-label__title">Start Pressure</span>
          <span class="pressure-label__value">{{ model.pressureStart }} bar</span>
        </div>
      </div>

      <PrimeSlider
        v-model="pressureRange"
        range
        :min="0"
        :max="300"
        class="gas-mix__slider"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.gas-mix {

  &__balance {
    display: flex;
    flex-direction: row;
    gap: 1rem;
  }

  &__pressure {
    width: 100%;
    padding: 0.5rem 0.75rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  &__pressure-labels {
    display: flex;
    justify-content: space-between;
  }

  &__slider {
    margin: 0 0.5rem;
  }
}

.pressure-label {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;

  &__title {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--ocean-text-muted);
    font-weight: 600;
  }

  &__value {
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--ocean-accent);
    font-family: 'Inter Tight', sans-serif;
  }
}

.text-right {
  text-align: right;
}
</style>