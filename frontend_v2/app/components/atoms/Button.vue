<script setup lang="ts">
/** Props */
const props = defineProps<{
  label?: string;
  icon?: string;
  iconPos?: "left" | "right" | "top" | "bottom";
  loading?: boolean;
  severity?: "primary" | "secondary" | "success" | "info" | "warn" | "danger" | "contrast";
  variant?: "plain" | "outlined" | "text" | "link";
  rounded?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  to?: string | object;
  href?: string;
  target?: string;
  isJumping?: boolean;
}>();

/** Emits */
const emit = defineEmits<{
  click: [event: Event];
}>();

/** Functions */
const handleClick = (event: Event) => {
  if (!props.disabled && !props.loading) {
    emit("click", event);
  }
};
</script>

<template>
  <PrimeButton
    :label="label"
    :icon="icon"
    :iconPos="iconPos"
    :loading="loading"
    :severity="severity"
    :variant="variant"
    :rounded="rounded"
    :disabled="disabled"
    :type="type"
    :to="to"
    :href="href"
    :target="target"
    :as="to ? 'router-link' : href ? 'a' : 'button'"
    :class="[
      'button', 
      { 'button--jumping': isJumping },
    ]"
    :data-id="'button'"
    @click="handleClick"
  >
    <slot />
  </PrimeButton>
</template>
