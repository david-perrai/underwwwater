<script setup lang="ts">
import { ref } from 'vue';
import { useAuthControllerLogin } from '~/composables/api/generated/auth/auth';

const { t } = useI18n();

const identifier = ref('');
const password = ref('');

const errors = ref<{
  identifier?: string;
  password?: string;
}>({});

const validateForm = (): boolean => {
  errors.value = {};
  let isValid = true;

  // Identifier validation (email or username)
  if (!identifier.value) {
    errors.value.identifier = t('auth.login.errors.identifierRequired');
    isValid = false;
  }

  // Password validation
  if (!password.value) {
    errors.value.password = t('auth.login.errors.passwordRequired');
    isValid = false;
  }

  return isValid;
};

const login = useAuthControllerLogin();

const handleSubmit = async () => {
  if (validateForm()) {
     const response = await login.mutateAsync({
     data: {    
      email: identifier.value,
      password: password.value,
     }
    });

    if(response.status === 200) {
      //todo à remplacer par une navigation vers le dashboard
      alert('User logged successfully')
    }
  }
};

// Clear error when user starts typing
const clearError = (field: keyof typeof errors.value) => {
  if (errors.value[field]) {
    errors.value[field] = undefined;
  }
};
</script>

<template>
  <div class="login-form">
    <div class="login-form__header">
      <h2 class="login-form__title">{{ $t('auth.login.title') }}</h2>
      <p class="login-form__subtitle">{{ $t('auth.login.subtitle') }}</p>
    </div>

    <form @submit.prevent="handleSubmit" class="login-form__form">
      
      <div class="field">
        <PVFloatLabel>
          <PVInputText 
            id="identifier" 
            v-model="identifier" 
            :class="{'p-invalid': errors.identifier}"
            class="w-full"
            @update:modelValue="clearError('identifier')"
          />
          <label for="identifier">{{ $t('auth.login.emailOrUsername') }}</label>
        </PVFloatLabel>
        <small v-if="errors.identifier" class="p-error">{{ errors.identifier }}</small>
      </div>

      <div class="field">
        <PVFloatLabel>
          <PVPassword 
            id="password" 
            v-model="password" 
            :feedback="false" 
            toggleMask 
            :class="{'p-invalid': errors.password}"
            class="w-full"
            inputClass="w-full"
            @update:modelValue="clearError('password')"
          />
          <label for="password">{{ $t('auth.login.password') }}</label>
        </PVFloatLabel>
        <small v-if="errors.password" class="p-error">{{ errors.password }}</small>
      </div>

      <div class="login-form__actions">
        <PVButton 
          type="submit" 
          :label="$t('auth.login.submit')" 
          icon="pi pi-sign-in" 
          class="w-full" 
        />
      </div>

      <div class="login-form__footer">
        <a href="#" class="login-form__link">{{ $t('auth.login.forgotPassword') }}</a>
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/variables' as *;

.login-form {
  width: 100%;
  max-width: 500px;
  margin: 0 auto;

  &__header {
    text-align: center;
    margin-bottom: 2rem;
  }

  &__title {
    font-family: $font-playfair;
    font-size: 2.5rem;
    color: $color-white;
    margin-bottom: 0.5rem;
  }

  &__subtitle {
    font-family: $font-inter;
    font-size: 1rem;
    color: rgba($color-white, 0.7);
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
  }

  :deep(.p-floatlabel) {
    display: block; 
    
    label {
      font-family: $font-barlow;
      color: rgba($color-white, 0.6);     
    }
  }

  :deep(.p-inputtext) {
    width: 100%;
    font-family: $font-inter;
    font-size: 1rem;
    padding: 1rem;
    background: rgba($color-marine, 0.5);
    backdrop-filter: blur(10px);
    border: 1px solid rgba($color-white, 0.2);
    border-radius: 4px;
    color: $color-white;
    transition: all 0.3s ease;
    
    &:enabled:hover {
      border-color: rgba($color-turquoise, 0.5);
    }

    &:enabled:focus {
      border-color: $color-turquoise;
      box-shadow: 0 0 0 1px $color-turquoise;
    }

    &.p-invalid {
      border-color: $color-red;
      &:focus {
        box-shadow: 0 0 0 1px $color-red;
      }
    }
  }

  // Password wrapper adjustment
  :deep(.p-password) {
    width: 100%;
    
    .p-password-input {
      width: 100%;
    }
  }

  .p-error {
    color: $color-red;
    font-family: $font-inter;
    font-size: 0.8rem;
    margin-left: 0.5rem;
    margin-top: 0.25rem;
  }

  &__actions {
    margin-top: 1rem;
    display: flex;
    justify-content: center;

    :deep(.p-button) {
      width: 100%;
      background: rgba($color-turquoise, 0.1); 
      border: 1px solid $color-turquoise;
      color: $color-turquoise;
      font-family: $font-barlow;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1px;
      padding: 1rem;
      transition: all 0.3s ease;
      
      .p-button-label {
        font-weight: 600;
      }

      &:hover {
        background: $color-turquoise;
        color: $color-marine;
        border-color: $color-turquoise;
      }
    }
  }

  &__footer {
    text-align: center;
    margin-top: 1rem;
  }

  &__link {
    font-family: $font-inter;
    font-size: 0.875rem;
    color: $color-turquoise;
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: rgba($color-turquoise, 0.8);
      text-decoration: underline;
    }
  }
}
</style>
