<script setup lang="ts">
/** Props */
const props = defineProps<{
  title?: string;
  subtitle?: string;
  submitLabel: string;
  severity?: string;
  name?: string;
  /** Quand true, rendu sans Card (à utiliser dans un PrimeDialog) */
  modal?: boolean;
}>();

/** Stores and Composables */
const navigationStore = useNavigationStore();

/** Emits */
const emit = defineEmits<{
  submit: [];
}>();

/** Functions */
const onSubmit = () => {
  emit('submit');
};

/** Computed */
const severityBorderVar = computed(() => {
  const map: Record<string, string> = {
    primary:   'var(--p-primary-500)',
    secondary: 'var(--p-secondary-500)',
  };
  // Only primary and secondary get a colored tint — others use a neutral gray
  return map[props.severity ?? 'primary'] ?? 'rgba(255, 255, 255, 0.25)';
});
</script>

<template>
  <!-- ── Mode Card (défaut) ─────────────────────────────────── -->
  <PrimeCard
    v-if="!modal"
    :class="['form', name ? `form-${name}` : '']"
    :data-id="name ? `form-${name}` : 'form'"
    :style="{ '--form-severity-color': severityBorderVar }"
  >
    <!-- Header: title + subtitle -->
    <template v-if="title || subtitle" #header>
      <div class="form__header">
        <h2 v-if="title" class="form__title">{{ title }}</h2>
        <p v-if="subtitle" class="form__subtitle">{{ subtitle }}</p>
      </div>
    </template>

    <template #content>
      <PrimeForm @submit="onSubmit" class="form__inner">
        <slot />
        <div class="form__actions">
          <slot name="actions">
            <PrimeButton
              type="submit"
              :label="submitLabel"
              :severity="severity ?? 'primary'"
              size="large"
              variant="plain"
            />
          </slot>
        </div>
        <div v-if="$slots.footer" class="form__footer">
          <slot name="footer" />
        </div>
      </PrimeForm>
    </template>
  </PrimeCard>

  <!-- ── Mode Modal (sans Card wrapper) ────────────────────── -->
   <PrimeDialog
    v-else
    v-model:visible="navigationStore.isModalDiveVisible"
    :header="$t('dive.form.title')"
    :closeButtonProps="{ severity: 'contrast', variant: 'text' }"
    modal
  >
    <PrimeForm
      :class="['form', name ? `form-${name}` : '']"
      :data-id="name ? `form-${name}` : 'form'"
      :style="{ '--form-severity-color': severityBorderVar }"
      @submit="onSubmit"
    >
      <slot />
      <div class="form__actions">
        <slot name="actions">
          <PrimeButton
            type="submit"
            :label="submitLabel"
            :severity="severity ?? 'primary'"
            size="large"
            variant="plain"
          />
        </slot>
      </div>
      <div v-if="$slots.footer" class="form__footer">
        <slot name="footer" />
      </div>
    </PrimeForm>
  </PrimeDialog>
</template>

<style lang="scss">
@use '@/assets/scss/variables' as *;

.form {
  width: 100%;
  max-width: 500px;
  margin: 0 auto;

  /* Severity border tint */
  border-color: color-mix(in srgb, var(--form-severity-color) 25%, transparent) !important;

  &:hover {
    border-color: color-mix(in srgb, var(--form-severity-color) 50%, transparent) !important;
  }

  /* Header */
  &__header {
    text-align: center;
    padding: 1.5rem 2rem 0;
  }

  &__title {
    font-family: $font-playfair;
    font-size: 42px;
    line-height: 1.15;
    margin: 0 0 0.5rem;
    color: #ffffff;
  }

  &__subtitle {
    font-family: $font-inter;
    font-size: 16px;
    line-height: 1.5;
    margin: 0;
    color: rgba(255, 255, 255, 0.7);
  }

  &__inner {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  &__fieldset {
    &--flex {
      .p-fieldset-content {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
      }
    }
  }

  &__actions {
    margin-top: 1rem;
    display: flex;
    justify-content: center;
  }

  &__footer {
    text-align: center;
    margin-top: 1rem;
  }

  &-dive {
    max-width: 750px;
  }

  /* Override PrimeVue input border colors to match severity */
  &:deep(.p-inputtext),
  &:deep(.p-password-input) {
    --p-inputtext-hover-border-color: color-mix(in srgb, var(--form-severity-color) 60%, transparent);
    --p-inputtext-focus-border-color: var(--form-severity-color);
  }

  &:deep(.p-datepicker-input) {
    --p-inputtext-hover-border-color: color-mix(in srgb, var(--form-severity-color) 60%, transparent);
    --p-inputtext-focus-border-color: var(--form-severity-color);
  }

  &:deep(.p-inputnumber-input) {
    --p-inputtext-hover-border-color: color-mix(in srgb, var(--form-severity-color) 60%, transparent);
    --p-inputtext-focus-border-color: var(--form-severity-color);
  }

  &:deep(.p-floatlabel) {
    --p-floatlabel-focus-color: var(--form-severity-color);
    --p-floatlabel-active-color: var(--form-severity-color);
  }
}
</style>
