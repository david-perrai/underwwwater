<script setup lang="ts">
import { useDiveStore } from "~/stores/dive";
import { useDivingTypesControllerFindAll } from "~/composables/api/generated/diving-types/diving-types";
import { required, minValue } from "~/composables/useFormValidator";

import GasTanks from "~/components/organisms/GasTanks.vue";
import DivingTypes from "~/components/molecules/DivingTypes.vue";
import { format } from "date-fns";
import { useDivingEnvironnementsControllerFindAll } from "~/composables/api/generated/diving-environnements/diving-environnements";
import { DIVING_ROLES } from "~/types/DivingType";
import type { CreateDiveDtoDiverRole } from "~/composables/api/generated/model";

/** Datas */
const date = ref<Date | null>(null);
const maxDepth = ref<number | null>(null);
const totalTime = ref<number | null>(null);
const selectedTypeIds = ref<number[]>([]);
const selectedEnvironmentId = ref<number | null>(null);
const selectedRole = ref<CreateDiveDtoDiverRole | null>(
  DIVING_ROLES[0]?.id || null,
);

/** Stores and Composables */
const { t } = useI18n();
const navigationStore = useNavigationStore();
const diveStore = useDiveStore();
const { data: divingTypesData } = useDivingTypesControllerFindAll();
const { data: divingEnvironmentsData } =
  useDivingEnvironnementsControllerFindAll();

const divingTypes = computed(() => divingTypesData.value?.data || []);
const divingEnvironments = computed(
  () => divingEnvironmentsData.value?.data || [],
);

/** Refs */
const gasTanksRef = ref<InstanceType<typeof GasTanks> | null>(null);

/** Composables */
const { errors, validateForm, clearError } = useFormValidator(
  { date, maxDepth, totalTime, selectedEnvironmentId, selectedRole },
  {
    date: [required(t("validation.dateRequired"))],
    maxDepth: [required(), minValue(0)],
    totalTime: [required(), minValue(1)],
    selectedEnvironmentId: [required()],
    selectedRole: [required()],
  },
);

/** Functions */
const saveDive = async () => {
  const tanksData = gasTanksRef.value?.tanks || [];

  const formattedTanks = tanksData.map((tank) => {
    const mixes = [];
    if (tank.gasMix.oxygen > 0)
      mixes.push({ type: "oxygen", percentage: tank.gasMix.oxygen });
    if (tank.gasMix.nitrogen > 0)
      mixes.push({ type: "nitrogen", percentage: tank.gasMix.nitrogen });
    if (tank.gasMix.helium > 0)
      mixes.push({ type: "helium", percentage: tank.gasMix.helium });

    return {
      pressureStart: tank.pressureStart,
      pressureEnd: tank.pressureEnd,
      gasMixes: mixes as any, // Cast to any to avoid strict enum matching issues for now, or match GasMixDto
    };
  });

  try {
    const response = await diveStore.addDive({
      date: date.value ? format(date.value, "yyyy-MM-dd") : "",
      maxDepth: maxDepth.value!,
      totalTime: totalTime.value!,
      gasTanks: formattedTanks,
      divingTypeIds: selectedTypeIds.value,
      divingEnvironmentId: selectedEnvironmentId.value!,
      diverRole: selectedRole.value!,
    });

    return !!response;
  } catch (error) {
    console.error("Failed to save dive:", error);
    return false;
  }
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
            :invalid="!!errors.date"
            :style="{ width: '306px' }"
            @update:model-value="clearError('date')"
          />
          <label for="date">{{ $t("dive.form.date") }}</label>
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
          <label for="maxDepth">{{ $t("dive.form.maxDepth") }}</label>
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
          <label for="totalTime">{{ $t("dive.form.totalTime") }}</label>
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
      <DivingTypes v-model="selectedTypeIds" :items="divingTypes" />
    </PrimeFieldset>

    <!-- Dive Environnement Selection -->
    <PrimeFieldset
      :legend="'Dive Environnement'"
      data-id="diving-environnements-fieldset"
    >
      <SelectChip
        v-model="selectedEnvironmentId"
        :items="divingEnvironments"
        @update:model-value="clearError('selectedEnvironmentId')"
      />
      <PrimeMessage
        v-if="errors.selectedEnvironmentId"
        size="small"
        severity="error"
        variant="simple"
      >
        {{ errors.selectedEnvironmentId }}
      </PrimeMessage>
    </PrimeFieldset>

    <!-- Dive Role Selection -->
    <PrimeFieldset :legend="'Dive Role'" data-id="diving-role-fieldset">
      <SelectChip
        v-model="selectedRole"
        :items="DIVING_ROLES"
        @update:model-value="clearError('selectedRole')"
      />
      <PrimeMessage
        v-if="errors.selectedRole"
        size="small"
        severity="error"
        variant="simple"
      >
        {{ errors.selectedEnvironmentId }}
      </PrimeMessage>
    </PrimeFieldset>

    <!-- Tanks -->
    <GasTanks ref="gasTanksRef" />

    <!-- Custom actions: two green buttons -->
    <template #actions>
      <div style="display: flex; gap: 1rem">
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
      </div>
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
