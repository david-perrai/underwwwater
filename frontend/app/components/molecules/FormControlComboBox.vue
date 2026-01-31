<script setup lang="ts">
import { ref } from "vue";
import { useGqlQueryManager } from "@/composables/gqlQueryManager";
import { GraphqlActions } from "@/types/models/graphql";
import {
  DivingThemeEdgeInterface,
  DivingThemeInterface,
} from "@/types/global/divingTheme";

const props = defineProps<{
  id: string;
  label: string;
  value: {
    edges: DivingThemeEdgeInterface[];
  };
  action: GraphqlActions;
}>();

const types = ref(props.value.edges.map((item) => item.node));

const items = await useGqlQueryManager(props.action).then((result) => {
  return result["divingTypes" as keyof typeof result].edges.map(
    (item: { node: DivingThemeInterface }) => item.node
  );
});
</script>

<template>
  <v-select
    v-model="types"
    :items="items"
    :item-title="'label'"
    :item-value="'id'"
    :label="label"
    :hint="label"
    persistent-hint
    multiple
    chips
    @update:modelValue="$emit('formInputChange', props.id, types)"
  ></v-select>
</template>
