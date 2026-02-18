<script setup lang="ts">
import { useAuthControllerLogin } from '~/composables/api/generated/auth/auth';

/** Datas */
const identifier = ref('');
const password = ref('');
const maxDepth = ref<number | null>(null);

/** Composables */
const login = useAuthControllerLogin();
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
      //todo à remplacer par une navigation vers le dashboard
      alert('User logged successfully')
    }
  }
};
</script>

<template>
  <Form
    :title="$t('auth.login.title')"
    :subtitle="$t('auth.login.subtitle')"
    :submit-label="$t('auth.login.submit')"
    submit-severity="primary"
    :submit-outlined="true"
    name="login"
    @submit="handleSubmit"
  >
    <FieldText
      id="identifier"
      v-model="identifier"
      :label="$t('auth.login.emailOrUsername')"
      :error="errors.identifier"
      @update:model-value="clearError('identifier')"
    />
     <FieldNumber
        :id="'maxDepth'"
        v-model="maxDepth"
        :label="$t('dive.form.maxDepth')"
        :min="1"
        :maxFractionDigits="1"
      />
    <FieldText
      id="password"
      v-model="password"
      type="password"
      :label="$t('auth.login.password')"
      :error="errors.password"
      :toggle-mask="true"
      @update:model-value="clearError('password')"
    />

    <template #footer>
      <Button 
        :label="$t('auth.login.forgotPassword')" 
        href="#" 
        :severity="'primary'" 
        :variant="'link'"
      />
    </template>
  </Form>
</template>