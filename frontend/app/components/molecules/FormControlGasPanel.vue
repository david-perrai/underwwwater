<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import { GasMix } from "@/types/global/gas";
import { translations } from "@/i18n/index";
import { useGasMixUpdater } from "@/composables/gasMixUpdater";
import { useGasNameProvider } from "@/composables/gasNameProvider";

const props = defineProps<{
  id: string;
  label: string;
  value: GasMix;
  index: number;
}>();

const emit = defineEmits<{
  (e: string, id: string, value: GasMix, index?: number, subId?: string): void;
}>();

const oxygenIsLocked = ref(false);
const nitrogenIsLocked = ref(false);
const heliumIsLocked = ref(true);

const { OXYGEN, NITROGEN, HELIUM, LOCK_GAS, CURRENT_GAS } = translations.en.GAS;
const { RULE_MUST_BE_BREATHABLE } = translations.en.FORM_WORDING;

const lockedGas = computed(() => {
  return oxygenIsLocked.value
    ? "oxygen"
    : nitrogenIsLocked.value
    ? "nitrogen"
    : heliumIsLocked.value
    ? "helium"
    : "";
});

const state = reactive({
  oxygen: props.value.oxygen,
  nitrogen: props.value.nitrogen,
  helium: props.value.helium,
  name: useGasNameProvider(props.value),
  disabledGas: lockedGas,
});

const handleChange = (value: number, propId: string) => {
  let newMix: GasMix = {
    helium: state.helium,
    oxygen: state.oxygen,
    nitrogen: state.nitrogen,
  };
  newMix[propId as keyof typeof newMix] = value;
  newMix = useGasMixUpdater(newMix, propId, state.disabledGas);
  state.oxygen = newMix.oxygen;
  state.nitrogen = newMix.nitrogen;
  state.helium = newMix.helium;
  state.name = useGasNameProvider(newMix);

  emit("formInputChange", props.id, newMix, props.index);
};

const checkChange = (value: boolean, context: string) => {
  if (!value) return;

  if (context === "oxygen") {
    nitrogenIsLocked.value = !oxygenIsLocked.value;
    heliumIsLocked.value = !oxygenIsLocked.value;
  } else if (context === "nitrogen") {
    oxygenIsLocked.value = !nitrogenIsLocked.value;
    heliumIsLocked.value = !nitrogenIsLocked.value;
  } else if (context === "helium") {
    oxygenIsLocked.value = !heliumIsLocked.value;
    nitrogenIsLocked.value = !heliumIsLocked.value;
  }
};
</script>

<template>
  <v-card>
    <v-card-title :class="['d-inline']">
      {{ CURRENT_GAS }}
    </v-card-title>
    <v-card-subtitle
      :class="[
        'd-inline',
        state.name.breathable ? 'color-white' : 'color-error',
      ]"
    >
      {{ state.name.title + state.name.subtitle }}
    </v-card-subtitle>
    <v-card-text>
      <v-input
        :rules="[ (v: boolean) => (state.name.breathable === true ) || RULE_MUST_BE_BREATHABLE, ]"
      >
        <div :class="['d-flex', 'flex-wrap', 'flex-column', 'w-100']">
          <v-slider
            v-model="state.oxygen"
            :label="OXYGEN"
            :readonly="oxygenIsLocked"
            :max="100"
            :min="0"
            :step="1"
            :class="[
              'form_controls--slider',
              'd-flex',
              'flex-wrap',
              'flex-column',
            ]"
            hide-details
            @update:model-value="handleChange(state.oxygen, 'oxygen')"
          >
            <template #append>
              <v-row>
                <v-col cols="5" :class="['pt-4']">
                  <v-text-field
                    v-model="state.oxygen"
                    :readonly="oxygenIsLocked"
                    type="number"
                    density="compact"
                    hide-details
                    variant="outlined"
                    :class="['w-100']"
                    @change="handleChange(state.oxygen, 'oxygen')"
                  />
                </v-col>
                <v-col cols="7" :align-self="'center'">
                  <v-checkbox
                    v-model="oxygenIsLocked"
                    :label="LOCK_GAS"
                    :class="['mx-0', 'align-center']"
                    hide-details
                    @change="checkChange(oxygenIsLocked, 'oxygen')"
                  />
                </v-col>
              </v-row>
            </template>
          </v-slider>

          <v-slider
            v-model="state.nitrogen"
            :label="NITROGEN"
            :readonly="nitrogenIsLocked"
            :max="100"
            :min="0"
            :step="1"
            :class="[
              'form_controls--slider',
              'd-flex',
              'flex-wrap',
              'flex-column',
            ]"
            hide-details
            @update:model-value="handleChange(state.nitrogen, 'nitrogen')"
          >
            <template #append>
              <v-row>
                <v-col cols="5" :class="['pt-4']">
                  <v-text-field
                    v-model="state.nitrogen"
                    :readonly="nitrogenIsLocked"
                    type="number"
                    density="compact"
                    hide-details
                    variant="outlined"
                    :class="['w-100']"
                    @change="handleChange(state.nitrogen, 'nitrogen')"
                  />
                </v-col>
                <v-col cols="7" :align-self="'center'">
                  <v-checkbox
                    v-model="nitrogenIsLocked"
                    :label="LOCK_GAS"
                    :class="['mx-0', 'align-center']"
                    hide-details
                    @change="checkChange(nitrogenIsLocked, 'nitrogen')"
                  />
                </v-col>
              </v-row>
            </template>
          </v-slider>

          <v-slider
            v-model="state.helium"
            :label="HELIUM"
            :readonly="heliumIsLocked"
            :max="100"
            :min="0"
            :step="1"
            :class="[
              'form_controls--slider',
              'd-flex',
              'flex-wrap',
              'flex-column',
            ]"
            hide-details
            @update:model-value="handleChange(state.helium, 'helium')"
          >
            <template #append>
              <v-row>
                <v-col cols="5" :class="['pt-4']">
                  <v-text-field
                    v-model="state.helium"
                    :readonly="heliumIsLocked"
                    type="number"
                    density="compact"
                    hide-details
                    variant="outlined"
                    :class="['w-100']"
                    @change="handleChange(state.helium, 'helium')"
                  />
                </v-col>
                <v-col cols="7" :align-self="'center'">
                  <v-checkbox
                    v-model="heliumIsLocked"
                    :label="LOCK_GAS"
                    :class="['mx-0', 'align-center']"
                    hide-details
                    @change="checkChange(heliumIsLocked, 'helium')"
                  />
                </v-col>
              </v-row>
            </template>
          </v-slider>
        </div>
      </v-input>
    </v-card-text>
  </v-card>
</template>
