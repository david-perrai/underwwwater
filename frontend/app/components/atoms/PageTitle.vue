<script setup lang="ts">
const props = defineProps<{
  label?: string;
  tag?: string;
}>();
</script>

<template>
  <v-card-title
    :tag="tag ?? 'span'"
    :class="['text-h5', 'font-weight-medium', 'py-8', 'text-center']"
  >
    {{ props.label }}
  </v-card-title>
</template>
