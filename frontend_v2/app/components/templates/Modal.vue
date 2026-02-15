<script setup lang="ts">
/** Props */
defineProps<{
  header?: string;
  visible: boolean;
}>();

/** Emits */
const emit = defineEmits<{
  'update:visible': [value: boolean];
}>();
</script>

<template>
  <PVDialog 
    :visible="visible" 
    @update:visible="emit('update:visible', $event)"
    modal 
    :header="header"
  >
    <slot />
  </PVDialog>
</template>