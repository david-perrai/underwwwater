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

const pressureEnd = computed({
  get: () => model.value.pressureEnd,
  set: (v) => model.value = { ...model.value, pressureEnd: v },
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

    <PrimeFieldset legend="Tank Pressure" class="form__fieldset--flex">
      <div class="form__field">
        <PrimeFloatLabel>
          <PrimeInputNumber
            id="pressureStart"
            v-model="pressureStart"
            suffix=" bar"
            :invalid="pressureEnd > pressureStart"
            :min="1"
          />
          <label for="pressureStart">Start Tank Pressure</label>
        </PrimeFloatLabel>
        <PrimeMessage
          v-if="pressureEnd > pressureStart"
          size="small"
          severity="error"
          variant="simple"
        >
          La pression de début est inférieure à la pression de fin
        </PrimeMessage>
      </div>
      <div class="form__field">
        <PrimeFloatLabel>
          <PrimeInputNumber
            id="pressureEnd"
            v-model="pressureEnd"
            suffix=" bar"
            :min="0"
            :max="pressureStart"
          />
          <label for="pressureEnd">End Tank Pressure</label>
        </PrimeFloatLabel>
      </div>
    </PrimeFieldset>
  </div>
</template>

<style scoped lang="scss">
.gas-mix {

  &__balance {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  }
}
</style>