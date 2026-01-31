<script setup lang="ts">
import { translations } from "@/i18n/index";
import { GasTank, GasMix } from "@/types/global/gas";

const props = defineProps<{
  id: string;
  label: string;
  value: GasTank[];
}>();

const emit = defineEmits<{
  (
    e: string,
    id: string,
    value: number | GasMix,
    index?: number,
    subId?: string
  ): void;
}>();

const { RULE_IS_REQUIRED, RULE_BE_POS_NUMBER, RULE_BE_INT_NUMBER } =
  translations.en.FORM_WORDING;

const { PRESSURE_END, PRESSURE_START, GAS_MIX } = translations.en.GAS;

const handleChange = (
  subId: string,
  value: number | GasMix,
  index?: number
) => {
  emit("formInputChange", props.id, value, index, subId);
};
</script>

<template>
  <v-card :title="GAS_MIX" border rounded :elevation="5">
    <v-row>
      <template v-for="(tank, index) in value" :key="index">
        <v-col cols="12" md="6" :align-self="'center'">
          <v-card>
            <v-card-text>
              <FormControlNumber
                :id="'pressureStart'"
                :index="index"
                :label="PRESSURE_START"
                :rules="[
                  (v: number) => !!v || RULE_IS_REQUIRED,
                  (v: number) => Math.sign(v) === 1 || RULE_BE_POS_NUMBER,
                  (v: number) => Number.isInteger(v) || RULE_BE_INT_NUMBER,
                ]"
                :value="props.value[index as number].pressureStart"
                @form-input-change="handleChange"
              />
            </v-card-text>
            <v-card-text>
              <FormControlNumber
                :id="'pressureEnd'"
                :index="index"
                :label="PRESSURE_END"
                :rules="[
                  (v: number) => !!v || RULE_IS_REQUIRED,
                  (v: number) => Math.sign(v) === 1 || RULE_BE_POS_NUMBER,
                  (v: number) => Number.isInteger(v) || RULE_BE_INT_NUMBER,
                ]"
                :value="props.value[index as number].pressureEnd"
                @form-input-change="handleChange"
              />
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="6">
          <FormControlGasPanel
            :id="'gasMix'"
            :index="index"
            :label="props.label"
            :value="props.value[index as number].gasMix"
            @form-input-change="handleChange"
          />
        </v-col>
      </template>
    </v-row>
  </v-card>
</template>
