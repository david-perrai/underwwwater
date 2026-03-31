<script setup lang="ts">
import { useAuthControllerResetPassword } from "~/composables/api/generated/auth/auth";
import {
  required,
  minLength,
  hasUppercase,
  hasSymbol,
  matches,
} from "~/composables/useFormValidator";

definePageMeta({
  layout: "landing",
});

const { t } = useI18n();

useHead({
  title: t("pages.resetPassword.title"),
  meta: [
    { name: "description", content: t("pages.resetPassword.description") },
  ],
});

/** Query param */
const route = useRoute();
const token = computed(() => route.query.token as string);

/** Datas */
const password = ref("");
const passwordConfirm = ref("");
const submitError = ref("");
const success = ref(false);

/** Composables */
const resetPassword = useAuthControllerResetPassword();
const { errors, validateForm, clearError } = useFormValidator(
  { password, passwordConfirm },
  {
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
  if (!token.value) {
    submitError.value = t("auth.resetPassword.invalidToken");
    return;
  }
  if (validateForm()) {
    try {
      const response = await resetPassword.mutateAsync({
        data: {
          token: token.value,
          password: password.value,
        },
      });
      if (response.status === 200) {
        success.value = true;
      } else {
        submitError.value =
          response.data.message ?? t("auth.resetPassword.genericError");
      }
    } catch {
      submitError.value = t("auth.resetPassword.genericError");
    }
  }
};
</script>

<template>
  <div class="auth-page">
    <div class="auth-page__overlay" />

    <div class="auth-page__container">
      <!-- Success state -->
      <div v-if="success" class="auth-page__success">
        <div class="success-card">
          <div class="success-card__icon">
            <i class="pi pi-check-circle" />
          </div>
          <h2 class="success-card__title">
            {{ $t("auth.resetPassword.successTitle") }}
          </h2>
          <p class="success-card__message">
            {{ $t("auth.resetPassword.successMessage") }}
          </p>
          <NuxtLink to="/login" class="success-card__link">
            <PrimeButton
              :label="$t('auth.resetPassword.backToLogin')"
              severity="primary"
              size="large"
              variant="plain"
            />
          </NuxtLink>
        </div>
      </div>

      <!-- Form state -->
      <section v-else class="auth-page__section">
        <Form
          :title="$t('auth.resetPassword.title')"
          :subtitle="$t('auth.resetPassword.subtitle')"
          :submit-label="$t('auth.resetPassword.submit')"
          severity="primary"
          name="reset-password"
          @submit="handleSubmit"
        >
          <!-- Global error -->
          <PrimeMessage
            v-if="submitError"
            severity="error"
            style="margin-bottom: 1em"
          >
            {{ submitError }}
          </PrimeMessage>

          <!-- Token missing warning -->
          <PrimeMessage
            v-if="!token"
            severity="warn"
            style="margin-bottom: 1em"
          >
            {{ $t("auth.resetPassword.missingToken") }}
          </PrimeMessage>

          <!-- 1. New password -->
          <div class="form__field">
            <PrimeFloatLabel>
              <PrimePassword
                id="form-reset-password__field-password"
                v-model="password"
                :fluid="true"
                :invalid="!!errors.password"
                :toggle-mask="true"
                :feedback="true"
                @update:model-value="clearError('password')"
              />
              <label for="form-reset-password__field-password">
                {{ $t("auth.resetPassword.password") }}
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

          <!-- 2. Confirm password -->
          <div class="form__field">
            <PrimeFloatLabel>
              <PrimePassword
                id="form-reset-password__field-password-confirm"
                v-model="passwordConfirm"
                :fluid="true"
                :invalid="!!errors.passwordConfirm"
                :toggle-mask="true"
                :feedback="false"
                @update:model-value="clearError('passwordConfirm')"
              />
              <label for="form-reset-password__field-password-confirm">
                {{ $t("auth.resetPassword.confirmPassword") }}
              </label>
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
        </Form>

        <div class="auth-page__back-link-wrapper">
          <NuxtLink to="/login" class="reset-password__back-link">
            {{ $t("auth.resetPassword.backToLogin") }}
          </NuxtLink>
        </div>
      </section>
    </div>
  </div>
</template>

<style lang="scss">
.auth-page {
  position: relative;
  min-height: 100vh;
  width: 100%;
  background-image: url("/bg2.webp");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 1rem;

  &__overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to bottom,
      rgba(#050a20, 0.85) 0%,
      rgba(#050a20, 0.9) 50%,
      rgba(#050a20, 0.95) 100%
    );
    z-index: 1;
  }

  &__container {
    position: relative;
    z-index: 2;
    width: 100%;
    max-width: 600px;
    animation: fadeUp 0.8s ease-out;
  }

  &__section {
    margin-bottom: 2rem;
  }

  &__success {
    display: flex;
    justify-content: center;
  }
}

.success-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 3rem 2.5rem;
  background: rgba(#050a20, 0.7);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(#00ffef, 0.25);
  border-radius: 12px;
  gap: 1.25rem;

  &__icon {
    font-size: 3.5rem;
    color: #00ffef;
    line-height: 1;

    i {
      font-size: inherit;
    }
  }

  &__title {
    font-family: "Inter Tight", serif;
    font-size: 2rem;
    color: #ffffff;
    margin: 0;
  }

  &__message {
    font-family: "Inter Tight", sans-serif;
    font-size: 1rem;
    color: rgba(#ffffff, 0.7);
    margin: 0;
    max-width: 360px;
    line-height: 1.6;
  }

  &__link {
    text-decoration: none;
    margin-top: 0.5rem;
  }
}

.reset-password {
  &__back-link {
    font-size: 0.875rem;
    color: rgba(#ffffff, 0.6);
    text-decoration: none;
    transition: color 0.15s ease;

    &:hover {
      color: #00ffef;
    }
  }
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
