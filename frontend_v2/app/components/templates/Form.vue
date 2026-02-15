<script setup lang="ts">
/** Props */
defineProps<{
  title?: string;
  subtitle?: string;
  submitLabel: string;
  submitSeverity?: string;
  submitOutlined?: boolean;
  name?: string;
}>();

/** Emits */
const emit = defineEmits<{
  submit: [];
}>();

/** Functions */
const onSubmit = () => {
  emit('submit');
};
</script>

<template>
  <div :class="['form', name ? `form-${name}` : '']" :data-id="name ? `form-${name}` : 'form'">
    <div v-if="title" :class="['form__header']">
      <h2 :class="['form__title']">{{ title }}</h2>
      <p v-if="subtitle" :class="['form__subtitle']">{{ subtitle }}</p>
    </div>

    <form @submit.prevent="onSubmit" :class="['form__inner']">
      <!-- Fields (default slot) -->
      <slot />

      <!-- Actions -->
      <div :class="['form__actions']">
        <slot name="actions">
          <Button
            type="submit"
            :label="submitLabel"
            size="large"
            :severity="submitSeverity ?? 'primary'"
            :outlined="submitOutlined ?? false"
            :is-important="true"
          />
        </slot>
      </div>

      <!-- Footer (optional) -->
      <div v-if="$slots.footer" :class="['form__footer']">
        <slot name="footer" />
      </div>
    </form>
  </div>
</template>
