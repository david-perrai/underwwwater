<script setup lang="ts">
import { useUsersControllerCreate } from '~/composables/api/generated/users/users';

/** Datas */
const email = ref('');
const username = ref('');
const password = ref('');
const passwordConfirm = ref('');

const errors = ref<{
  email?: string;
  username?: string;
  password?: string;
  passwordConfirm?: string;
}>({});

/** Composables */
const { t } = useI18n();
const signup = useUsersControllerCreate();

/** Functions */
const validatePassword = (pwd: string): string | undefined => {
  if (pwd.length < 10) {
    return t('auth.signup.errors.passwordMinLength');
  }
  if (!/[A-Z]/.test(pwd)) {
    return t('auth.signup.errors.passwordUppercase');
  }
  if (!/[^a-zA-Z0-9]/.test(pwd)) {
    return t('auth.signup.errors.passwordSymbol');
  }
  return undefined;
};

const validateForm = (): boolean => {
  errors.value = {};
  let isValid = true;

  // Email validation
  if (!email.value) {
    errors.value.email = t('auth.signup.errors.emailRequired');
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    errors.value.email = t('auth.signup.errors.emailInvalid');
    isValid = false;
  }

  // Username validation
  if (!username.value) {
    errors.value.username = t('auth.signup.errors.usernameRequired');
    isValid = false;
  } else if (username.value.length < 3) {
    errors.value.username = t('auth.signup.errors.usernameMinLength');
    isValid = false;
  }

  // Password validation
  if (!password.value) {
    errors.value.password = t('auth.signup.errors.passwordRequired');
    isValid = false;
  } else {
    const passwordError = validatePassword(password.value);
    if (passwordError) {
      errors.value.password = passwordError;
      isValid = false;
    }
  }

  // Password confirmation validation
  if (!passwordConfirm.value) {
    errors.value.passwordConfirm = t('auth.signup.errors.confirmPasswordRequired');
    isValid = false;
  } else if (password.value !== passwordConfirm.value) {
    errors.value.passwordConfirm = t('auth.signup.errors.passwordMismatch');
    isValid = false;
  }

  return isValid;
};

const handleSubmit = async () => {
  if (validateForm()) {
    const response = await signup.mutateAsync({
     data: {    
      email: email.value,
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

// Clear error when user starts typing
const clearError = (field: keyof typeof errors.value) => {
  if (errors.value[field]) {
    errors.value[field] = undefined;
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
            v-model="email" 
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
        <PVButton 
          type="submit" 
          :label="$t('auth.signup.submit')" 
          icon="pi pi-user-plus" 
          class="w-full"
        />
      </div>
    </form>
  </div>
</template>
