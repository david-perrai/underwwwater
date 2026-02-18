<script setup lang="ts">
import { useAuthControllerLogin } from '~/composables/api/generated/auth/auth';

/** Datas */
const identifier = ref('');
const password = ref('');

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
    <div :class="['field']">
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

    <div :class="['field']">
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