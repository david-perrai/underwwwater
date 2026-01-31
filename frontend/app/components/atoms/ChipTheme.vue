<script setup lang="ts">
const props = defineProps<{
  color: string;
  label: string;
  variant?:
    | "flat"
    | "text"
    | "elevated"
    | "tonal"
    | "outlined"
    | "plain"
    | undefined;
}>();
</script>

<template>
  <v-chip size="small" :variant="props.variant" :color="props.color">
    {{ props.label }}
  </v-chip>
</template>
