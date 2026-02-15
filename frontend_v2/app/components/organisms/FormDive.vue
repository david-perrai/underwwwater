<script setup lang="ts">
import { useDivesControllerCreate } from '~/composables/api/generated/dives/dives';
import { required, minValue } from '~/composables/useFormValidator';

/** Datas */
const date = ref<Date | null>(null);
const maxDepth = ref<number | null>(null);
const totalTime = ref<number | null>(null);

/** Stores and Composables */
const { t } = useI18n();
const navigationStore = useNavigationStore();
const createDive = useDivesControllerCreate();

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
  const response = await createDive.mutateAsync({
    data: {
      date: date.value!,
      maxDepth: maxDepth.value!,
      totalTime: totalTime.value!,
      gasTanks: [],
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
    <!-- Date & Time -->
    <div :class="['field']">
      <PVFloatLabel>
        <PVDatePicker
          id="date"
          v-model="date"
          showTime
          hourFormat="24"
          :class="{ 'p-invalid': errors.date }"
          class="w-full"
          dateFormat="dd/mm/yy"
          @update:modelValue="clearError('date')"
        />
        <label for="date">{{ $t('dive.form.date') }}</label>
      </PVFloatLabel>
      <small v-if="errors.date" class="p-error">{{ errors.date }}</small>
    </div>

    <!-- Max Depth -->
    <div :class="['field']">
      <PVFloatLabel>
        <PVInputNumber
          id="maxDepth"
          v-model="maxDepth"
          :min="0"
          :maxFractionDigits="1"
          suffix=" m"
          :class="{ 'p-invalid': errors.maxDepth }"
          class="w-full"
          inputClass="w-full"
          @update:modelValue="clearError('maxDepth')"
        />
        <label for="maxDepth">{{ $t('dive.form.maxDepth') }}</label>
      </PVFloatLabel>
      <small v-if="errors.maxDepth" class="p-error">{{ errors.maxDepth }}</small>
    </div>

    <!-- Total Time -->
    <div :class="['field']">
      <PVFloatLabel>
        <PVInputNumber
          id="totalTime"
          v-model="totalTime"
          :min="1"
          suffix=" min"
          :class="{ 'p-invalid': errors.totalTime }"
          class="w-full"
          inputClass="w-full"
          @update:modelValue="clearError('totalTime')"
        />
        <label for="totalTime">{{ $t('dive.form.totalTime') }}</label>
      </PVFloatLabel>
      <small v-if="errors.totalTime" class="p-error">{{ errors.totalTime }}</small>
    </div>

    <!-- Custom actions: two green buttons -->
    <template #actions>
      <Button
        type="submit"
        :label="$t('dive.form.submit')"
        size="large"
        severity="success"
        :is-important="true"
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
