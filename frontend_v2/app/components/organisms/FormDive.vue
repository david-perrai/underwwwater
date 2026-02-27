<script setup lang="ts">
import { useDivesControllerCreate } from '~/composables/api/generated/dives/dives';
import { required, minValue } from '~/composables/useFormValidator';

import GasTanks from '~/components/organisms/GasTanks.vue';
import DivingTypes from '~/components/molecules/DivingTypes.vue';
import { DIVING_TYPES } from '~/types/DivingType';

/** Datas */
const date = ref<Date | null>(null);
const maxDepth = ref<number | null>(null);
const totalTime = ref<number | null>(null);
const selectedTypeTokens = ref<string[]>([]);

/** Stores and Composables */
const { t } = useI18n();
const navigationStore = useNavigationStore();
const createDive = useDivesControllerCreate();

const gasTanksRef = ref<InstanceType<typeof GasTanks> | null>(null);

const { errors, validateForm, clearError } = useFormValidator(
  { date, maxDepth, totalTime },
  {
    date: [
      required(t('validation.dateRequired')),
    ],
    maxDepth: [
      required(),
      minValue(0),
    ],
    totalTime: [
      required(),
      minValue(1),
    ],
  },
);

/** Functions */
const saveDive = async () => {
  const tanksData = gasTanksRef.value?.tanks || [];
  
  const formattedTanks = tanksData.map((tank) => {
    const mixes = [];
    if (tank.gasMix.oxygen > 0) mixes.push({ type: 'oxygen', percentage: tank.gasMix.oxygen });
    if (tank.gasMix.nitrogen > 0) mixes.push({ type: 'nitrogen', percentage: tank.gasMix.nitrogen });
    if (tank.gasMix.helium > 0) mixes.push({ type: 'helium', percentage: tank.gasMix.helium });

    return {
      pressureStart: tank.pressureStart,
      pressureEnd: tank.pressureEnd,
      gasMixes: mixes as any // Cast to any to avoid strict enum matching issues for now, or match GasMixDto
    };
  });

  const response = await createDive.mutateAsync({
    data: {
      date: date.value!,
      maxDepth: maxDepth.value!,
      totalTime: totalTime.value!,
      gasTanks: formattedTanks,
      divingTypeIds: selectedTypeTokens.value.map(token => {
        // Mapping tokens to IDs based on their index in the seeder/constant list for now
        // This should ideally be handled by fetching actual IDs from the API
        const typeIndex = DIVING_TYPES.findIndex(t => t.token === token);
        return typeIndex !== -1 ? typeIndex + 1 : 0;
      }).filter(id => id > 0),
      divingEnvironmentId: 1,
      diverRole: 'diver' as any,
    },
  });

  return response.status === 201;
};

const handleSubmitAndClose = async () => {
  if (validateForm()) {
    const success = await saveDive();
    if (success) {
      navigationStore.toggleModalDive();
    }
  }
};

const handleSubmitAndContinue = async () => {
  if (validateForm()) {
    await saveDive();
    // Keep modal open, values stay for quick re-entry
  }
};
</script>

<template>
  <Form
    :submit-label="$t('dive.form.submit')"
    severity="success"
    name="dive"
    :modal="true"
    @submit="handleSubmitAndClose"
  >
    <!-- Champs Datetime - Depth - Duration -->
    <PrimeFieldset :legend="'Globals'" :class="['form__fieldset--flex']">
      <!-- Date & Time -->
      <div class="form__field">
        <PrimeFloatLabel>
          <PrimeDatePicker
            id="date"
            v-model="date"
            showTime
            hour-format="24"
            :invalid="!!errors.date"
            :style="{ width: '306px' }"
            @update:model-value="clearError('date')"
          />
          <label for="date">{{ $t('dive.form.date') }}</label>
        </PrimeFloatLabel>
        <PrimeMessage 
          v-if="errors.date"
          size="small" 
          severity="error"
          variant="simple"
        >
          {{ errors.date }}
        </PrimeMessage>
      </div>

      <!-- Max Depth -->
      <div class="form__field">
        <PrimeFloatLabel>
          <PrimeInputNumber
            id="maxDepth"
            v-model="maxDepth"
            :min="1"
            :max-fraction-digits="1"
            :invalid="!!errors.maxDepth"
            @update:model-value="clearError('maxDepth')"
          />
          <label for="maxDepth">{{ $t('dive.form.maxDepth') }}</label>
        </PrimeFloatLabel>
        <PrimeMessage 
          v-if="errors.maxDepth"
          size="small" 
          severity="error"
          variant="simple"
        >
          {{ errors.maxDepth }}
        </PrimeMessage>
      </div>

      <!-- Total Time -->
      <div class="form__field">
        <PrimeFloatLabel>
          <PrimeInputNumber
            id="totalTime"
            v-model="totalTime"
            :min="1"
            :max-fraction-digits="1"
            :invalid="!!errors.totalTime"
            @update:model-value="clearError('totalTime')"
          />
          <label for="totalTime">{{ $t('dive.form.totalTime') }}</label>
        </PrimeFloatLabel>
        <PrimeMessage 
          v-if="errors.totalTime"
          size="small" 
          severity="error"
          variant="simple"
        >
          {{ errors.totalTime }}
        </PrimeMessage>
      </div>
    </PrimeFieldset>

    <!-- Dive Types Selection -->
    <PrimeFieldset :legend="'Dive Types'" data-id="diving-types-fieldset">
      <DivingTypes v-model="selectedTypeTokens" />
    </PrimeFieldset>

    <!-- Tanks -->
    <GasTanks ref="gasTanksRef" />

    <!-- Custom actions: two green buttons -->
    <template #actions>
      <PrimeButton
        type="submit"
        :label="$t('dive.form.submit')"
        :severity="'success'" 
        :size="'large'" 
        icon="pi pi-plus"
        variant="plain" 
      />
      <PrimeButton
        type="button"
        :label="$t('dive.form.submitAndContinue')"
        :severity="'success'" 
        :size="'large'" 
        variant="outlined" 
        icon="pi pi-plus-circle"
        @click="handleSubmitAndContinue"
      />
    </template>
  </Form>
</template>

<style lang="scss" scoped>
.form-dive {
  &__row {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;

    .field {
      flex: 1;
      margin-bottom: 0; // Override default field margin if any
    }
  }
}
</style>
