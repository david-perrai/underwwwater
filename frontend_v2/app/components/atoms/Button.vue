<script setup lang="ts">
/** Props */
const props = defineProps<{
  label?: string;
  icon?: string;
  iconPos?: "left" | "right" | "top" | "bottom";
  badge?: string;
  badgeSeverity?:
    | "secondary"
    | "success"
    | "info"
    | "warn"
    | "danger"
    | "contrast";
  loading?: boolean;
  loadingIcon?: string;
  link?: boolean;
  severity?: "primary" | "secondary" | "success" | "info" | "warn" | "danger" | "contrast";
  raised?: boolean;
  rounded?: boolean;
  text?: boolean;
  outlined?: boolean;
  size?: "small" | "large";
  plain?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  to?: string | object;
  href?: string;
  target?: string;
  ariaLabel?: string;
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
    :badge="badge"
    :badgeSeverity="badgeSeverity"
    :loading="loading"
    :loadingIcon="loadingIcon"
    :link="link"
    :severity="severity"
    :raised="raised"
    :rounded="rounded"
    :text="text"
    :outlined="outlined"
    :size="size"
    :plain="plain"
    :disabled="disabled"
    :type="type"
    :aria-label="ariaLabel"
    :class="['button']"
    :data-id="'button'"
    @click="handleClick"
  >
    <slot />
  </PVButton>
</template>
