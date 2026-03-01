<script setup lang="ts">
/** Props */
const props = defineProps<{
  isSmall?: boolean;
}>();
/** Datas */

/** Stores and Composables */

/** Computeds */

/** Functions */

/** Lifecyle Hooks */
</script>

<template>
  <div 
    :class="['logo', { 'logo--small': props.isSmall }]" 
    :data-id="'logo'"
  >
    under<span :class="['logo__highlight']">www</span>ater
  </div>
</template>
