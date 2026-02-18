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
  <PVButton
    :label="label"
    :icon="icon"
    :iconPos="iconPos"
    :loading="loading"
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
      variant === 'outlined' ? 
      'button--outlined' : 
      variant === 'text' ?
      'button--text' : 
      variant === 'link' ?
      'button--link' : 
      'button--plain',
      severity === 'primary' ? 
      'button--primary' : 
      severity === 'secondary' ?
      'button--secondary' : 
      severity === 'success' ?
      'button--success' : 
      severity === 'info' ?
      'button--info' : 
      severity === 'warn' ?
      'button--warn' : 
      severity === 'danger' ?
      'button--danger' : 
      'button--contrast',
    ]"
    :unstyled="true"
    :data-id="'button'"
    @click="handleClick"
  >
    <slot />
  </PVButton>
</template>
