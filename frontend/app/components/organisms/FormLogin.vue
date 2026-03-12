<script setup lang="ts">



/** Datas */
const email = ref('');
const password = ref('');
const loginError = ref('');

/** Composables */
const auth = useAuth();

const { t } = useI18n();
const { errors, validateForm, clearError } = useFormValidator(
  { email, password },
  {
    email: [required(t('validation.emailRequired'))],
    password: [required(t('validation.passwordRequired'))],
  },
);

/** Functions */
const handleSubmit = async () => {
  if (validateForm()) {     
    const response = await auth.login(email.value, password.value);    
    if(response.success) {
      navigateTo('/dashboard');
    } else {
      loginError.value = response.message;
    }
  }
};

const handleInput = (field: 'email' | 'password') => {
  clearError(field);
  loginError.value = '';
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
    <PrimeMessage 
      v-if="loginError"
      severity="error"
      style="margin-bottom: 1em;"
    >
      {{ loginError }}
    </PrimeMessage>
    
    <div :class="['form__field']">
      <PrimeFloatLabel>
        <PrimeInputText
          :id="'form-login__field-identifier'"
          v-model="email"
          :type="'text'"
          :fluid="true"
          :invalid="!!errors.email"
          @update:model-value="handleInput('email')"
        />
        <label :for="'form-login__field-identifier'">
          {{ $t('auth.login.email') }}
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
          @update:model-value="handleInput('password')"
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

    <template>
      <PrimeButton 
        :label="$t('auth.login.forgotPassword')" 
        href="#" 
        :severity="'primary'" 
        :variant="'link'"
      />
    </template>
  </Form>
</template>