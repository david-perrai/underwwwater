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
    <!-- Email -->
    <FieldText
      id="email"
      v-model="emailField"
      :label="$t('auth.signup.email')"
      :error="errors.email"
      @update:model-value="clearError('email')"
    />

    <!-- Username -->
    <FieldText
      id="username"
      v-model="username"
      :label="$t('auth.signup.username')"
      :error="errors.username"
      @update:model-value="clearError('username')"
    />

    <!-- Password -->
    <FieldText
      id="password"
      v-model="password"
      type="password"
      :label="$t('auth.signup.password')"
      :error="errors.password"
      :toggle-mask="true"
      :feedback="true"
      @update:model-value="clearError('password')"
    />

    <!-- Confirm Password -->
    <FieldText
      id="passwordConfirm"
      v-model="passwordConfirm"
      type="password"
      :label="$t('auth.signup.confirmPassword')"
      :error="errors.passwordConfirm"
      :toggle-mask="true"
      @update:model-value="clearError('passwordConfirm')"
    />
  </Form>
</template>
