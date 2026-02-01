<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  id: string;
  label: string;
  type?: string;
  icon?: string | null;
  rules?: [];
}>();

const emit = defineEmits(["formInputChange"]);
const userState = useUserState();

const text = ref(
  props.id === "username" && userState.value.username
    ? userState.value.username
    : ""
);
</script>

<template>
  <v-text-field
    v-model="text"
    :prepend-icon="icon || undefined"
    :label="props.label"
    :rules="props.rules"
    :type="type"
    @change="emit('formInputChange', props.id, text)"
    variant="outlined"
  ></v-text-field>
</template>
