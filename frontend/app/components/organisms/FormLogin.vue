<script setup lang="ts">
import { useAuthControllerForgotPassword } from "~/composables/api/generated/auth/auth";
import { required, email as emailRule } from "~/composables/useFormValidator";

/** Datas */
const email = ref("");
const password = ref("");
const loginError = ref("");

/** Forgot password modal */
const forgotPasswordVisible = ref(false);
const forgotEmail = ref("");
const forgotSuccess = ref(false);
const forgotError = ref("");

/** Composables */
const auth = useAuth();
const forgotPassword = useAuthControllerForgotPassword();

const { t } = useI18n();
const { errors, validateForm, clearError } = useFormValidator(
  { email, password },
  {
    email: [required(t("validation.emailRequired"))],
    password: [required(t("validation.passwordRequired"))],
  },
);

const {
  errors: forgotErrors,
  validateForm: validateForgotForm,
  clearError: clearForgotError,
} = useFormValidator(
  { email: forgotEmail },
  {
    email: [required(t("validation.emailRequired")), emailRule()],
  },
);

/** Functions */
const handleSubmit = async () => {
  if (validateForm()) {
    const response = await auth.login(email.value, password.value);
    if (response.success) {
      navigateTo("/dashboard");
    } else {
      loginError.value = response.message;
    }
  }
};

const handleInput = (field: "email" | "password") => {
  clearError(field);
  loginError.value = "";
};

const openForgotModal = () => {
  forgotEmail.value = "";
  forgotSuccess.value = false;
  forgotError.value = "";
  forgotPasswordVisible.value = true;
};

const handleForgotSubmit = async () => {
  if (validateForgotForm()) {
    try {
      await forgotPassword.mutateAsync({ data: { email: forgotEmail.value } });
      forgotSuccess.value = true;
    } catch {
      forgotError.value = t("auth.forgotPassword.genericError");
    }
  }
};
</script>

<template>
  <Form
    :title="$t('auth.login.title')"
    :subtitle="$t('auth.login.subtitle')"
    :submit-label="$t('auth.login.submit')"
    severity="primary"
    name="login"
    @submit="handleSubmit"
  >
    <PrimeMessage v-if="loginError" severity="error" style="margin-bottom: 1em">
      {{ loginError }}
    </PrimeMessage>

    <!-- 1. Email -->
    <div class="form__field">
      <PrimeFloatLabel>
        <PrimeInputText
          id="form-login__field-identifier"
          v-model="email"
          type="text"
          :fluid="true"
          :invalid="!!errors.email"
          @update:model-value="handleInput('email')"
        />
        <label for="form-login__field-identifier">
          {{ $t("auth.login.email") }}
        </label>
      </PrimeFloatLabel>
      <PrimeMessage
        v-if="errors.email"
        size="small"
        severity="error"
        variant="simple"
      >
        {{ errors.email }}
      </PrimeMessage>
    </div>

    <!-- 2. Password -->
    <div class="form__field">
      <PrimeFloatLabel>
        <PrimePassword
          id="form-login__field-password"
          v-model="password"
          :fluid="true"
          :invalid="!!errors.password"
          :toggle-mask="true"
          :feedback="false"
          @update:model-value="handleInput('password')"
        />
        <label for="form-login__field-password">
          {{ $t("auth.login.password") }}
        </label>
      </PrimeFloatLabel>
      <PrimeMessage
        v-if="errors.password"
        size="small"
        severity="error"
        variant="simple"
      >
        {{ errors.password }}
      </PrimeMessage>
    </div>

    <!-- Forgot password link -->
    <button type="button" class="forgot-password-btn" @click="openForgotModal">
      <i class="pi pi-question-circle" />
      {{ $t("auth.forgotPassword.trigger") }}
    </button>
  </Form>

  <!-- Forgot password modal -->
  <PrimeDialog
    v-model:visible="forgotPasswordVisible"
    :header="$t('auth.forgotPassword.modalTitle')"
    :modal="true"
    :draggable="false"
    :close-button-props="{ severity: 'contrast', variant: 'text' }"
    class="forgot-password-dialog"
    style="width: min(480px, 95vw)"
  >
    <!-- Success state -->
    <div v-if="forgotSuccess" class="forgot-password-dialog__success">
      <i class="pi pi-send forgot-password-dialog__success-icon" />
      <p class="forgot-password-dialog__success-title">
        {{ $t("auth.forgotPassword.successTitle") }}
      </p>
      <p class="forgot-password-dialog__success-message">
        {{ $t("auth.forgotPassword.successMessage") }}
      </p>
      <PrimeButton
        :label="$t('auth.forgotPassword.close')"
        severity="primary"
        variant="plain"
        @click="forgotPasswordVisible = false"
      />
    </div>

    <!-- Form state -->
    <template v-else>
      <p class="forgot-password-dialog__description">
        {{ $t("auth.forgotPassword.description") }}
      </p>

      <PrimeMessage
        v-if="forgotError"
        severity="error"
        style="margin-bottom: 1em"
      >
        {{ forgotError }}
      </PrimeMessage>

      <PrimeForm
        class="forgot-password-dialog__form"
        @submit="handleForgotSubmit"
      >
        <div class="form__field">
          <PrimeFloatLabel>
            <PrimeInputText
              id="forgot-password__field-email"
              v-model="forgotEmail"
              type="email"
              :fluid="true"
              :invalid="!!forgotErrors.email"
              @update:model-value="clearForgotError('email')"
            />
            <label for="forgot-password__field-email">
              {{ $t("auth.forgotPassword.email") }}
            </label>
          </PrimeFloatLabel>
          <PrimeMessage
            v-if="forgotErrors.email"
            size="small"
            severity="error"
            variant="simple"
          >
            {{ forgotErrors.email }}
          </PrimeMessage>
        </div>

        <div class="forgot-password-dialog__actions">
          <PrimeButton
            type="submit"
            :label="$t('auth.forgotPassword.submit')"
            severity="primary"
            size="large"
            variant="plain"
            :loading="forgotPassword.isPending.value"
          />
        </div>
      </PrimeForm>
    </template>
  </PrimeDialog>
</template>

<style lang="scss">
.forgot-password-btn {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 0.8rem;
  font-family: "Inter Tight", sans-serif;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.45);
  letter-spacing: 0.3px;
  padding: 0;
  margin-top: -0.5rem;
  transition: color 0.15s ease;
  align-self: flex-start;

  i {
    font-size: 0.85rem;
  }

  &:hover {
    color: #00ffef;
  }
}

.forgot-password-dialog {
  &__description {
    font-family: "Inter Tight", sans-serif;
    font-size: 0.925rem;
    color: rgba(255, 255, 255, 0.65);
    line-height: 1.6;
    margin: 0 0 1.5rem;
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  &__actions {
    display: flex;
    justify-content: center;
    margin-top: 0.5rem;
  }

  &__success {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 1rem 0 0.5rem;
    gap: 1rem;
  }

  &__success-icon {
    font-size: 2.5rem;
    color: #00ffef;
  }

  &__success-title {
    font-family: "Inter Tight", sans-serif;
    font-size: 1.15rem;
    font-weight: 700;
    color: #fff;
    margin: 0;
  }

  &__success-message {
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.6);
    line-height: 1.6;
    margin: 0;
    max-width: 320px;
  }
}
</style>
