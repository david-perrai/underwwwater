<script setup lang="ts">
/** Props */
const props = defineProps({
  border: {
    type: Boolean,
    default: false,
  },
});

/** Datas */

/** Stores and Composables */

/** Computeds */

/** Functions */

/** Lifecyle Hooks */
</script>

<template>
  <div :class="['card']" :data-id="'card'">
    <PrimeCard>
      <template #header>
        <slot name="header"></slot>
      </template>
      <template #title>
        <slot name="title"></slot>
      </template>
      <template #subtitle>
        <slot name="subtitle"></slot>
      </template>
      <template #content>
        <slot name="content"></slot>
      </template>
      <template #footer>
        <slot name="footer"></slot>
      </template>
    </PrimeCard>
  </div>
</template>
