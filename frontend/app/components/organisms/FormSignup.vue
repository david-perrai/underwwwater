<script setup lang="ts">
import { useUsersControllerCreate } from "~/composables/api/generated/users/users";
import {
  required,
  email as emailRule,
  minLength,
  hasUppercase,
  hasSymbol,
  matches,
} from "~/composables/useFormValidator";

/** Datas */
const emailField = ref("");
const username = ref("");
const password = ref("");
const passwordConfirm = ref("");
const turnstileToken = ref("");
const signupError = ref("");
const signupSuccessVisible = ref(false);

/** Composables */
const { t } = useI18n();
const signup = useUsersControllerCreate();

const { errors, validateForm, clearError } = useFormValidator(
  { email: emailField, username, password, passwordConfirm },
  {
    email: [required(t("validation.emailRequired")), emailRule()],
    username: [
      required(t("validation.usernameRequired")),
      minLength(3, t("validation.usernameMinLength", { min: 3 })),
    ],
    password: [
      required(t("validation.passwordRequired")),
      minLength(10),
      hasUppercase(),
      hasSymbol(),
    ],
    passwordConfirm: [
      required(t("validation.confirmPasswordRequired")),
      matches(password),
    ],
  },
);

/** Functions */
const handleSubmit = async () => {
  if (validateForm()) {
    const response = await signup.mutateAsync({
      data: {
        email: emailField.value,
        username: username.value,
        password: password.value,
        turnstileToken: turnstileToken.value,
      },
    });

    if (response.status === 201) {
      signupSuccessVisible.value = true;
      return;
    }

    signupError.value = response.data?.message || "";
  }
};

const resetForm = () => {
  emailField.value = "";
  username.value = "";
  password.value = "";
  passwordConfirm.value = "";
  turnstileToken.value = "";
};

const goToLogin = () => {
  signupSuccessVisible.value = false;
  resetForm();
  window.scrollTo({ top: 0, behavior: "smooth" });
};
</script>

<template>
  <Form
    :title="$t('auth.signup.title')"
    :subtitle="$t('auth.signup.subtitle')"
    :submit-label="$t('auth.signup.submit')"
    severity="secondary"
    name="signup"
    @submit="handleSubmit"
  >
    <PrimeMessage
      v-if="signupError"
      severity="error"
      style="margin-bottom: 1em"
    >
      {{ signupError }}
    </PrimeMessage>
    <!-- 1. Email -->
    <div class="form__field">
      <PrimeFloatLabel>
        <PrimeInputText
          id="email"
          v-model="emailField"
          :fluid="true"
          :invalid="!!errors.email"
          @update:model-value="clearError('email')"
        />
        <label for="email">{{ $t("auth.signup.email") }}</label>
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

    <!-- 2. Username -->
    <div class="form__field">
      <PrimeFloatLabel>
        <PrimeInputText
          id="username"
          v-model="username"
          :fluid="true"
          :invalid="!!errors.username"
          @update:model-value="clearError('username')"
        />
        <label for="username">{{ $t("auth.signup.username") }}</label>
      </PrimeFloatLabel>
      <PrimeMessage
        v-if="errors.username"
        size="small"
        severity="error"
        variant="simple"
      >
        {{ errors.username }}
      </PrimeMessage>
    </div>

    <!-- 3. Password -->
    <div class="form__field">
      <PrimeFloatLabel>
        <PrimePassword
          id="password"
          v-model="password"
          :fluid="true"
          :invalid="!!errors.password"
          :toggle-mask="true"
          :feedback="true"
          @update:model-value="clearError('password')"
        />
        <label for="password">{{ $t("auth.signup.password") }}</label>
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

    <!-- 4. Confirm Password -->
    <div class="form__field">
      <PrimeFloatLabel>
        <PrimePassword
          id="passwordConfirm"
          v-model="passwordConfirm"
          :fluid="true"
          :invalid="!!errors.passwordConfirm"
          :toggle-mask="true"
          :feedback="false"
          @update:model-value="clearError('passwordConfirm')"
        />
        <label for="passwordConfirm">{{
          $t("auth.signup.confirmPassword")
        }}</label>
      </PrimeFloatLabel>
      <PrimeMessage
        v-if="errors.passwordConfirm"
        size="small"
        severity="error"
        variant="simple"
      >
        {{ errors.passwordConfirm }}
      </PrimeMessage>
    </div>

    <!-- 5. Captcha -->
    <div style="display: flex; justify-content: center">
      <NuxtTurnstile v-model="turnstileToken" />
    </div>
  </Form>

  <!-- Signup success modal -->
  <PrimeDialog
    v-model:visible="signupSuccessVisible"
    :header="$t('auth.signup.successTitle')"
    :modal="true"
    :draggable="false"
    :close-button-props="{ severity: 'contrast', variant: 'text' }"
    class="signup-success-dialog"
    style="width: min(480px, 95vw)"
    @hide="goToLogin"
  >
    <div class="signup-success-dialog__content">
      <i class="pi pi-check-circle signup-success-dialog__icon" />
      <p class="signup-success-dialog__message">
        {{ $t("auth.signup.successMessage") }}
      </p>
      <PrimeButton
        :label="$t('auth.signup.goToLogin')"
        severity="primary"
        size="large"
        variant="plain"
        @click="goToLogin"
      />
    </div>
  </PrimeDialog>
</template>

<style lang="scss">
.signup-success-dialog {
  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 1rem 0 0.5rem;
    gap: 1.5rem;
  }

  &__icon {
    font-size: 3.5rem;
    color: #00ffef;
  }

  &__message {
    font-size: 1.05rem;
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.6;
    margin: 0;
    max-width: 380px;
    font-family: "Inter Tight", sans-serif;
  }
}
</style>
