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
  <div :class="['form', 'form-signup']" :data-id="'form-signup'">
    <div :class="['form__header']">
      <h2 :class="['form__title']">{{ $t('auth.signup.title') }}</h2>
      <p :class="['form__subtitle']">{{ $t('auth.signup.subtitle') }}</p>
    </div>

    <form @submit.prevent="handleSubmit" :class="['form__inner']">
      
      <div :class="['field']">
        <PVFloatLabel>
          <PVInputText 
            id="email" 
            v-model="emailField" 
            :class="{'p-invalid': errors.email}" 
            class="w-full"
            @update:modelValue="clearError('email')"
          />
          <label for="email">{{ $t('auth.signup.email') }}</label>
        </PVFloatLabel>
        <small v-if="errors.email" class="p-error">{{ errors.email }}</small>
      </div>

      <div :class="['field']">
        <PVFloatLabel variant="over">
          <PVInputText 
            id="username" 
            v-model="username" 
            :class="{'p-invalid': errors.username}" 
            class="w-full"
            @update:modelValue="clearError('username')"
          />
          <label for="username">{{ $t('auth.signup.username') }}</label>
        </PVFloatLabel>
        <small v-if="errors.username" class="p-error">{{ errors.username }}</small>
      </div>

      <div :class="['field']">
        <PVFloatLabel variant="over">
          <PVPassword 
            id="password" 
            v-model="password" 
            toggleMask 
            :class="{'p-invalid': errors.password}"
            class="w-full"
            inputClass="w-full"
            @update:modelValue="clearError('password')"
          >           
            <template #footer>            
              <p class="mt-2 text-sm">{{ $t('auth.passwordStrength.requirements') || 'Requirements:' }}</p>
              <ul class="pl-2 ml-2 mt-0 list-disc line-height-3 text-sm">
                <li>{{ $t('auth.passwordStrength.min') || 'At least 10 characters' }}</li>
                <li>{{ $t('auth.passwordStrength.upper') || 'At least one uppercase' }}</li>
                <li>{{ $t('auth.passwordStrength.numeric') || 'At least one numeric' }}</li>
                <li>{{ $t('auth.passwordStrength.symbol') || 'At least one symbol' }}</li>
              </ul>
            </template>
          </PVPassword>
          <label for="password">{{ $t('auth.signup.password') }}</label>
        </PVFloatLabel>
        <small v-if="errors.password" class="p-error">{{ errors.password }}</small>
      </div>

      <div :class="['field']">
        <PVFloatLabel>
          <PVPassword 
            id="passwordConfirm" 
            v-model="passwordConfirm" 
            :feedback="false" 
            toggleMask 
            :class="{'p-invalid': errors.passwordConfirm}"
            class="w-full"
            inputClass="w-full"
            @update:modelValue="clearError('passwordConfirm')"
          />
          <label for="passwordConfirm">{{ $t('auth.signup.confirmPassword') }}</label>
        </PVFloatLabel>
        <small v-if="errors.passwordConfirm" class="p-error">{{ errors.passwordConfirm }}</small>
      </div>

      <div :class="['form__actions']">
        <Button 
          type="submit" 
          :label="$t('auth.signup.submit')" 
          :size="'large'" 
          :severity="'secondary'"
          :is-important="true"
        />
      </div>
    </form>
  </div>
</template>
