<script setup lang="ts">
import { useAuthControllerLogin } from '~/composables/api/generated/auth/auth';

/** Datas */
const identifier = ref('');
const password = ref('');

/** Composables */
const login = useAuthControllerLogin();
const userStore = useUserStore();
const { t } = useI18n();
const { errors, validateForm, clearError } = useFormValidator(
  { identifier, password },
  {
    identifier: [required(t('validation.identifierRequired'))],
    password: [required(t('validation.passwordRequired'))],
  },
);

/** Functions */
const handleSubmit = async () => {
  if (validateForm()) {
     const response = await login.mutateAsync({
     data: {    
      email: identifier.value,
      password: password.value,
     }
    });

    if(response.status === 200) {
      userStore.loadFromToken(response.data.accessToken);      
      navigateTo('/dashboard');
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
    <!-- 1. Identifier -->
    <div :class="['form__field']">
      <PrimeFloatLabel>
        <PrimeInputText
          :id="'form-login__field-identifier'"
          v-model="identifier"
          :type="'text'"
          :fluid="true"
          :invalid="!!errors.identifier"
          @update:model-value="clearError('identifier')"
        />
        <label :for="'form-login__field-identifier'">
          {{ $t('auth.login.emailOrUsername') }}
        </label>
      </PrimeFloatLabel>
      <PrimeMessage 
        v-if="errors.identifier"
        size="small" 
        severity="error"
        variant="simple"
      >
        {{ errors.identifier }}
      </PrimeMessage>
    </div>

    <!-- 2. Password -->
    <div :class="['form__field']">
      <PrimeFloatLabel>
        <PrimePassword
          :id="'form-login__field-password'"
          v-model="password"
          :type="'text'"
          :fluid="true"
          :invalid="!!errors.password"
          :toggle-mask="true"
          :feedback="false"
          @update:model-value="clearError('password')"
        />
        <label :for="'form-login__field-password'">
          {{ $t('auth.login.password') }}
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

    <!-- 3. Footer - Forgot Password -->
    <template #footer>
      <PrimeButton 
        :label="$t('auth.login.forgotPassword')" 
        href="#" 
        :severity="'primary'" 
        :variant="'link'"
      />
    </template>
  </Form>
</template>