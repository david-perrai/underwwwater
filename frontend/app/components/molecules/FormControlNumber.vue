<script setup lang="ts">
import { reactive } from "vue";

const props = defineProps<{
  id: string;
  label: string;
  value: number;
  index?: number;
  rules: ((v: number) => boolean)[];
}>();

const number = reactive({
  value: props.value,
});
</script>

<template>
  <v-text-field
    v-model.number="number.value"
    :label="props.label"
    :rules="props.rules"
    persistent-hint
    variant="outlined"
    required
    @change="$emit('formInputChange', props.id, number.value, props.index)"
  ></v-text-field>
</template>
