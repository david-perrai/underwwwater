<script setup lang="ts">
import { ref } from "vue";
import { translations } from "@/i18n/index";

const props = defineProps<{
  id: string;
  label: string;
  type: string;
  subtitle?: string;
  icon?: string | undefined;
  rules?: [];
}>();

const emit = defineEmits(["formInputChange"]);

const text = ref("");
const text_verifier = ref("");
const { RULE_PASSWORD } = translations.en.FORM_WORDING;

const matchingPasswords = () => {
  if (text.value === text_verifier.value) {
    return true;
  } else {
    return RULE_PASSWORD;
  }
};
</script>

<template>
  <div>
    <v-text-field
      v-model="text"
      :prepend-icon="icon"
      :label="props.label"
      :type="type"
      :rules="props.rules"
      variant="outlined"
      @change="emit('formInputChange', props.id, text)"
    >
    </v-text-field>
    <br />
    <v-text-field
      v-model="text_verifier"
      :prepend-icon="icon"
      :label="props.label"
      :type="type"
      :rules="[...(props.rules || []), matchingPasswords]"
      variant="outlined"
    >
    </v-text-field>

    <p v-if="props.subtitle" :class="['text-center', 'mt-5']">
      {{ props.subtitle }}
    </p>

    <v-divider :class="['my-10']"></v-divider>
  </div>
</template>
