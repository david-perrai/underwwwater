<script setup lang="ts">
import { useUsersControllerCreate } from '~/composables/api/generated/users/users';
import { required, email as emailRule, minLength, hasUppercase, hasSymbol, matches } from '~/composables/useFormValidator';

/** Datas */
const emailField = ref('');
const username = ref('');
const password = ref('');
const passwordConfirm = ref('');

/** Composables */
const { t } = useI18n();
const signup = useUsersControllerCreate();

const { errors, validateForm, clearError } = useFormValidator(
  { email: emailField, username, password, passwordConfirm },
  {
    email: [
      required(t('validation.emailRequired')),
      emailRule(),
    ],
    username: [
      required(t('validation.usernameRequired')),
      minLength(3, t('validation.usernameMinLength', { min: 3 })),
    ],
    password: [
      required(t('validation.passwordRequired')),
      minLength(10),
      hasUppercase(),
      hasSymbol(),
    ],
    passwordConfirm: [
      required(t('validation.confirmPasswordRequired')),
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
     }
    });

    if(response.status === 201) {
      //todo à remplacer par une navigation vers le dashboard
      alert('User created successfully')
    }
  }
};
</script>

<template>
  <Form
    :title="$t('auth.signup.title')"
    :subtitle="$t('auth.signup.subtitle')"
    :submit-label="$t('auth.signup.submit')"
    submit-severity="secondary"
    name="signup"
    @submit="handleSubmit"
  >
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
        <label for="email">{{ $t('auth.signup.email') }}</label>
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
        <label for="username">{{ $t('auth.signup.username') }}</label>
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
        <label for="password">{{ $t('auth.signup.password') }}</label>
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
        <label for="passwordConfirm">{{ $t('auth.signup.confirmPassword') }}</label>
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
</template>
