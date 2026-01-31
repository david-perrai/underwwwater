<script setup lang="ts">
import { defineAsyncComponent, ref, reactive, watch } from "vue";
import { FormActions } from "@/types/models/form";
import type { DiveInterface } from "@/types/global/dive";
import type {
  DivingThemeEdgeInterface,
  DivingThemeInterface,
} from "@/types/global/divingTheme";
import type { GasMix } from "@/types/global/gas";
import { formatISO } from "date-fns";
import { useDiveInitializer } from "@/composables/diveInitializer";
import { useAlertFactory } from "@/composables/alertFactory";
import { useFormFactory } from "@/composables/formFactory";
// import { MUTATION_CREATE_DIVE } from "@/graphql/mutations/createDive";
// import { MUTATION_UPDATE_DIVE } from "@/graphql/mutations/updateDive";
// import { useMutation } from "@vue/apollo-composable";
import { translations } from "@/i18n/index";

const FormControlDate = defineAsyncComponent(
  () => import("@/components/molecules/FormControlDate.vue")
);
const FormControlSelect = defineAsyncComponent(
  () => import("@/components/molecules/FormControlSelect.vue")
);
const FormControlComboBox = defineAsyncComponent(
  () => import("@/components/molecules/FormControlComboBox.vue")
);
const FormControlNumber = defineAsyncComponent(
  () => import("@/components/molecules/FormControlNumber.vue")
);
const FormControlGasGroup = defineAsyncComponent(
  () => import("@/components/molecules/FormControlGasGroup.vue")
);

const isUpdating = !!window.history.state.dive;
const valid = ref(false);
const loading = ref(false);
const formTemplate = ref();
const { NEW_DIVE, UPDATE_DIVE } = translations.en.ALERTS;
const { BUTTON_ADD, BUTTON_UPDATE } = translations.en.FORM_DIVING;

const dive: DiveInterface = isUpdating
  ? reactive({
      ...JSON.parse(window.history.state.dive),
      date: new Date(Date.parse(JSON.parse(window.history.state.dive).date)),
    })
  : reactive(useDiveInitializer());

const form = useFormFactory(
  isUpdating ? FormActions.DIVE_UPDATE : FormActions.DIVE_CREATE,
  dive
);

const handleChange = (
  id: string,
  value:
    | Date
    | DivingThemeInterface
    | DivingThemeInterface[]
    | GasMix
    | number
    | null,
  index: number,
  subId: string
) => {
  switch (id) {
    case "date":
      dive[id] = value as Date;
      break;
    case "maxDepth":
    case "totalTime":
      dive[id] = value as number;
      break;
    case "divingRole":
    case "divingEnvironment":
      dive[id] = value as DivingThemeInterface | null;
      break;
    case "divingType":
      dive[id] = value as {
        edges: DivingThemeEdgeInterface[];
      };
      break;
    case "gasTanks":
      switch (subId) {
        case "pressureStart":
        case "pressureEnd":
          dive.gasTanks[index as number][subId] = value as number;
          break;
        case "gasMix":
          dive.gasTanks[index as number][subId] = value as GasMix;
          break;
        default:
          break;
      }
      break;
    default:
      break;
  }
};

const load = () => {
  loading.value = true;
  setTimeout(() => (loading.value = false), 5000);
};

const payload = reactive({
  ...(isUpdating && { id: dive.id }),
  date: formatISO(new Date(dive.date), {
    representation: "complete",
  }),
  totalTime: dive.totalTime,
  maxDepth: dive.maxDepth,
  gasTanks: dive.gasTanks,
  divingType: Array.isArray(dive.divingType)
    ? dive.divingType
    : Array.isArray(dive.divingType.edges) && dive.divingType.edges.length
    ? dive.divingType.edges.map((type) => type.node.id)
    : dive.divingType.edges,
  divingEnvironment:
    dive.divingEnvironment !== null ? dive.divingEnvironment.id : null,
  divingRole: dive.divingRole !== null ? dive.divingRole.id : null,
});

// const { mutate, onDone, onError } = useMutation(
//   isUpdating ? MUTATION_UPDATE_DIVE : MUTATION_CREATE_DIVE,
//   {
//     variables: {
//       input: payload,
//     },
//   }
// );

// onError((error) => {
//   useAlertFactory("error", error.toString());
// });

// onDone(() => {
//   useAlertFactory("success", isUpdating ? UPDATE_DIVE : NEW_DIVE);
//   navigateTo({ name: "diveForm" });
// });

const onSubmit = async () => {
  const { valid } = await formTemplate.value.validate();

  if (valid) {
    // mutate();
    load();
  }
};

watch(dive, async () => {
  payload.date = formatISO(new Date(dive.date), {
    representation: "complete",
  });
  payload.totalTime = dive.totalTime;
  payload.maxDepth = dive.maxDepth;
  payload.gasTanks = dive.gasTanks;
  (payload.divingType = Array.isArray(dive.divingType)
    ? dive.divingType
    : Array.isArray(dive.divingType.edges) && dive.divingType.edges.length
    ? dive.divingType.edges.map((type) => type.node.id)
    : dive.divingType.edges),
    (payload.divingEnvironment =
      dive.divingEnvironment !== null ? dive.divingEnvironment.id : null);
  payload.divingRole = dive.divingRole !== null ? dive.divingRole.id : null;
});
</script>

<template>
  <Suspense>
    <v-form v-model="valid" ref="formTemplate" lazy-validation action="#">
      <PageTitle :label="form.title" />
      <v-card-text>
        <v-row>
          <template v-for="component in form.controls" :key="component">
            <v-col
              v-if="component.props?.name"
              :order="
                component.props?.name === 'FormControlDate'
                  ? 1
                  : component.props?.name === 'FormControlNumber'
                  ? 2
                  : component.props?.name === 'FormControlSelect'
                  ? 3
                  : component.props?.name === 'FormControlComboBox'
                  ? 4
                  : component.props?.name === 'FormControlGasGroup'
                  ? 5
                  : 10
              "
              :cols="12"
              :md="component.props?.name !== 'FormControlGasGroup' ? 4 : 12"
            >
              <component
                :is="
                  component.props?.name === 'FormControlDate'
                    ? FormControlDate
                    : component.props?.name === 'FormControlNumber'
                    ? FormControlNumber
                    : component.props?.name === 'FormControlSelect'
                    ? FormControlSelect
                    : component.props?.name === 'FormControlComboBox'
                    ? FormControlComboBox
                    : FormControlGasGroup
                "
                :id="component.id"
                :value="dive[component.id as keyof typeof dive]"
                :label="component.props?.label"
                :query="component.props?.query"
                :type="component.props?.type"
                :rules="component.props?.rules"
                :icon="component.props?.icon"
                :subtitle="component.props?.subtitle"
                :action="component.props?.query"
                @form-input-change="handleChange"
              ></component>
            </v-col>
          </template>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-container>
          <v-btn
            variant="flat"
            color="success"
            :size="'x-large'"
            :loading="loading"
            :disabled="loading"
            @click="onSubmit"
          >
            {{ isUpdating ? BUTTON_UPDATE : BUTTON_ADD }}
          </v-btn>
        </v-container>
      </v-card-actions>
    </v-form>
  </Suspense>
</template>
