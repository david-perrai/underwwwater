<script setup lang="ts">
import { useDivesControllerCreate } from '~/composables/api/generated/dives/dives';
import { required, minValue } from '~/composables/useFormValidator';

import GasTanks from '~/components/organisms/GasTanks.vue';

/** Datas */
const date = ref<Date | null>(null);
const maxDepth = ref<number | null>(null);
const totalTime = ref<number | null>(null);

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
      divingTypeIds: [],
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
    submit-severity="success"
    name="dive"
    @submit="handleSubmitAndClose"
  >
    <!-- Context Fields Row -->
    <div class="form-dive__row gap-4 mb-4">
      <!-- Date & Time -->
      <FieldDate
        id="date"
        v-model="date"
        :label="$t('dive.form.date')"
        showTime
        :error="errors.date"
        @update:model-value="clearError('date')"
      />

      <!-- Max Depth -->
      <FieldNumber
        :id="'maxDepth'"
        v-model="maxDepth"
        :label="$t('dive.form.maxDepth')"
        :min="1"
        :maxFractionDigits="1"
        :error="errors.maxDepth"
        @update:model-value="clearError('maxDepth')"
      />

      <!-- Total Time -->
      <FieldNumber
        id="totalTime"
        v-model="totalTime"
        :label="$t('dive.form.totalTime')"
        :min="1"
        :maxFractionDigits="1"
        :error="errors.totalTime"
        @update:model-value="clearError('totalTime')"
      />
    </div>

    <PVDivider />

    <GasTanks ref="gasTanksRef" />

    <!-- Custom actions: two green buttons -->
    <template #actions>
      <Button
        type="submit"
        :label="$t('dive.form.submit')"
        size="large"
        severity="success"
      />
      <Button
        type="button"
        :label="$t('dive.form.submitAndContinue')"
        size="large"
        severity="success"
        :outlined="true"
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
