import type { Ref } from 'vue';

// ──────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────

/** A single validation rule: returns an error message or undefined if valid */
export type ValidatorRule = (value: string) => string | undefined;

/** Map of field names → their current Ref<string> value */
export type FieldRefs<T extends string = string> = Record<T, Ref<string>>;

/** Map of field names → array of rules to run (in order) */
export type ValidationRules<T extends string = string> = Partial<Record<T, ValidatorRule[]>>;

// ──────────────────────────────────────────────
// Validator helpers (factory functions)
//
// Each helper embeds a default i18n key.
// An optional `msg` override can be passed for
// edge-cases where the default wording doesn't fit.
// ──────────────────────────────────────────────

/** Field must not be empty */
export const required = (msg?: string): ValidatorRule => {
  const { t } = useI18n();
  const message = msg ?? t('validation.required');
  return (value: string) => (!value ? message : undefined);
};

/** Field must match a basic email pattern */
export const email = (msg?: string): ValidatorRule => {
  const { t } = useI18n();
  const message = msg ?? t('validation.emailInvalid');
  return (value: string) =>
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? message : undefined;
};

/** Field must have at least `length` characters */
export const minLength = (length: number, msg?: string): ValidatorRule => {
  const { t } = useI18n();
  const message = msg ?? t('validation.passwordMinLength', { min: length });
  return (value: string) => (value.length < length ? message : undefined);
};

/** Field must contain at least one uppercase letter */
export const hasUppercase = (msg?: string): ValidatorRule => {
  const { t } = useI18n();
  const message = msg ?? t('validation.passwordUppercase');
  return (value: string) => (!/[A-Z]/.test(value) ? message : undefined);
};

/** Field must contain at least one symbol (non-alphanumeric) */
export const hasSymbol = (msg?: string): ValidatorRule => {
  const { t } = useI18n();
  const message = msg ?? t('validation.passwordSymbol');
  return (value: string) => (!/[^a-zA-Z0-9]/.test(value) ? message : undefined);
};

/** Field must equal the value of another ref (e.g. password confirmation) */
export const matches = (otherRef: Ref<string>, msg?: string): ValidatorRule => {
  const { t } = useI18n();
  const message = msg ?? t('validation.passwordMismatch');
  return (value: string) => (value !== otherRef.value ? message : undefined);
};

// ──────────────────────────────────────────────
// Composable
// ──────────────────────────────────────────────

/**
 * useFormValidator – generic, rule-based form validation composable.
 *
 * @param fields  – reactive refs for each field value
 * @param rules   – validation rules per field (run in order, first error wins)
 */
export const useFormValidator = <T extends string>(
  fields: FieldRefs<T>,
  rules: ValidationRules<T>,
) => {
  /** State */
  const errors = ref<Partial<Record<T, string>>>({}) as Ref<Partial<Record<T, string>>>;

  /** Methods */

  /**
   * Run every rule for every field.
   * Stops at the first failing rule per field.
   * @returns `true` if the whole form is valid
   */
  const validateForm = (): boolean => {
    const newErrors: Partial<Record<T, string>> = {};
    let isValid = true;

    for (const fieldName of Object.keys(fields) as T[]) {
      const fieldRules = rules[fieldName];
      if (!fieldRules) continue;

      const value = fields[fieldName].value;

      for (const rule of fieldRules) {
        const error = rule(value);
        if (error) {
          newErrors[fieldName] = error;
          isValid = false;
          break; // first error wins for this field
        }
      }
    }

    errors.value = newErrors;
    return isValid;
  };

  /** Clear the error for a specific field (useful on @input) */
  const clearError = (field: T) => {
    if (errors.value[field]) {
      const updated = { ...errors.value };
      delete updated[field];
      errors.value = updated;
    }
  };

  return {
    errors,
    validateForm,
    clearError,
  };
};
