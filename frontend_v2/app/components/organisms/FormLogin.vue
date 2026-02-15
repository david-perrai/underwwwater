<script setup lang="ts">
import { useAuthControllerLogin } from '~/composables/api/generated/auth/auth';
import { required } from '~/composables/useFormValidator';

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
  <div :class="['form', 'form-login']" :data-id="'form-login'">
    <div :class="['form__header']">
      <h2 :class="['form__title']">{{ $t('auth.login.title') }}</h2>
      <p :class="['form__subtitle']">{{ $t('auth.login.subtitle') }}</p>
    </div>

    <form @submit.prevent="handleSubmit" :class="['form__inner']">
      
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

      <div :class="['form__actions']">
        <Button 
          type="submit" 
          :label="$t('auth.login.submit')" 
          :size="'large'" 
          :severity="'primary'"
          :outlined="true"
          :is-important="true"
        />
      </div>

      <div :class="['form__footer']">
        <a href="#" :class="['form__link']">{{ $t('auth.login.forgotPassword') }}</a>
      </div>
    </form>
  </div>
</template>