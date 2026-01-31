<script setup lang="ts">
import { defineAsyncComponent, ref } from "vue";
import { reactive } from "vue";
import { FormActions, type FormUserCredentials } from "@/types/models/form";
import { useAuthLogin } from "@/composables/auth";
import { useFormFactory } from "@/composables/formFactory";
// import { MUTATION_CREATE_USER } from "@/graphql/mutations/createUser";
// import { useMutation } from "@vue/apollo-composable";
import { useAlertFactory } from "../../composables/alertFactory";
import { translations } from "@/i18n/index";

const FormControlText = defineAsyncComponent(
  () => import("@/components/molecules/FormControlText.vue")
);

const FormControlDoubleText = defineAsyncComponent(
  () => import("@/components/molecules/FormControlDoubleText.vue")
);

const props = defineProps<{
  action: FormActions;
}>();

const dialog = ref(false);
const valid = ref(false);
const formTemplate = ref();

const form = useFormFactory(props.action);
const label = props.action === FormActions.LOGIN ? "Login" : "Register";
const color = props.action === FormActions.LOGIN ? "success" : "secondary";

const { CREATE_USER, ERROR_CREATE_USER } = translations.en.ALERTS;
const { CLOSE, REQUIRED_FIELDS } = translations.en.FORM_WORDING;

const credentials: FormUserCredentials = reactive(
  props.action === FormActions.LOGIN
    ? {
        email: "",
        password: "",
      }
    : {
        email: "",
        password: "",
        username: "",
      }
);

const handleChange = (id: string, text: string) => {
  if (id === "email") {
    credentials.email = text;
  } else if (id === "password") {
    credentials.password = text;
  } else if (id === "username") {
    credentials.username = text;
  }
};

// const { mutate, onDone, onError } = useMutation(MUTATION_CREATE_USER, {
//   variables: {
//     input: credentials,
//   },
// });

// onError((error) => {
//   useAlertFactory("error", ERROR_CREATE_USER + error.toString());
//   navigateTo({ name: "index" });
// });

// onDone(() => {
//   useAlertFactory("success", CREATE_USER);
//   navigateTo({ name: "index" });
// });

const onSubmit = async () => {
  if (props.action === FormActions.LOGIN) {
    useAuthLogin(credentials);
    dialog.value = false;
  } else {
    const { valid } = await formTemplate.value.validate();

    if (valid) {
      // mutate();
      dialog.value = false;
    }
  }
};
</script>

<template>
  <v-dialog v-model="dialog" persistent>
    <template #activator="{ props }">
      <v-btn
        variant="flat"
        :size="'default'"
        :color="color"
        v-bind="props"
        :class="['mx-4']"
      >
        {{ label }}
      </v-btn>
    </template>
    <v-card>
      <v-form v-model="valid" ref="formTemplate" lazy-validation action="#">
        <PageTitle :label="label" />
        <v-card-text :tag="'fieldset'">
          <v-row>
            <v-col
              v-for="(component, index) in form.controls"
              cols="12"
              sm="8"
              :class="['mx-auto']"
              :key="index"
            >
              <component
                :is="
                  component.props?.name === 'FormControlDoubleText'
                    ? FormControlDoubleText
                    : FormControlText
                "
                :id="component.id"
                :label="component.props!.label + '*'"
                :type="component.props!.type"
                :rules="component.props?.rules"
                :icon="component.props?.icon"
                @form-input-change="handleChange"
                required
              ></component>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions :class="['mx-auto']">
          <v-row>
            <v-col cols="12" sm="8" :class="['mx-auto']">
              <small>{{ REQUIRED_FIELDS }}</small>
            </v-col>
            <v-col cols="12" sm="8" :class="['mx-auto', 'text-center']">
              <v-btn
                variant="text"
                :size="'default'"
                :class="['my-2', 'mx-2']"
                @click="dialog = false"
              >
                {{ CLOSE }}
              </v-btn>
              <v-btn
                variant="flat"
                :size="'default'"
                :class="['my-2', 'mx-2']"
                :color="color"
                @click="onSubmit"
              >
                {{ label }}
              </v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>
