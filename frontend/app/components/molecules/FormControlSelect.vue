<script setup lang="ts">
import { ref } from "vue";
import { useGqlQueryManager } from "@/composables/gqlQueryManager";
import { type DivingThemeInterface } from "@/types/global/divingTheme";  

const props = defineProps<{
  id: string;
  label: string;
  value: DivingThemeInterface;
  action: string;
  rules: ((v: number) => boolean)[];
}>();

const value = ref(props.value);

const key: string =
  props.action === "divingRoles"
    ? "divingRoles"
    : props.action === "divingEnvironments"
    ? "divingEnvironments"
    : "";

const items = await useGqlQueryManager(props.action).then((result) => {
  return result[key as keyof typeof result].edges.map(
    (item: { node: DivingThemeInterface }) => item.node
  );
});
</script>

<template>
  <v-select
    v-model="value"
    :items="items"
    :item-title="'label'"
    :item-value="'value'"
    :label="label"
    :rules="props.rules"
    :hint="label"
    variant="outlined"
    persistent-hint
    return-object
    single-line
    required
    @update:modelValue="$emit('formInputChange', props.id, value)"
  ></v-select>
</template>
