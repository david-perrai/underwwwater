<script setup lang="ts">
import { ref } from "vue";
import { useMutation } from "@vue/apollo-composable";
import { translations } from "@/i18n/index";
import { useAlertFactory } from "@/composables/alertFactory";
import { MUTATION_DELETE_DIVE } from "@/graphql/mutations/deleteDive";

const props = defineProps<{
  id: string;
}>();

const dialog = ref(false);
const { DELETE, CANCEL } = translations.en.FORM_WORDING;
const { REMOVE_DIVE } = translations.en.ALERTS;
const { CONSENT } = translations.en.DIVES_LIST;

const { mutate, onDone, onError } = useMutation(MUTATION_DELETE_DIVE, {
  variables: {
    input: { id: props.id },
  },
});

onError((error) => {
  useAlertFactory("error", error.toString());
});

onDone(() => {
  useAlertFactory("success", REMOVE_DIVE);
  dialog.value = false;
});
</script>

<template>
  <span class="text-center">
    <v-btn
      icon="$trashCanOutline"
      color="error"
      size="x-small"
      @click="dialog = true"
    />

    <v-dialog v-model="dialog">
      <v-card>
        <v-card-text>{{ CONSENT }}</v-card-text>
        <v-card-actions>
          <v-btn color="primary" :variant="'tonal'" @click="dialog = false">
            {{ CANCEL }}
          </v-btn>
          <v-btn color="error" :variant="'flat'" @click="mutate()">
            {{ DELETE }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </span>
</template>
