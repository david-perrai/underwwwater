<script setup lang="ts">
/** Props */
interface Props {
  id: string;
  label: string;
  error?: string;
  type?: 'text' | 'password';
  disabled?: boolean;
  feedback?: boolean; // Strength for 
  toggleMask?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  feedback: false,
  toggleMask: false,
});

/** Model */
const modelValue = defineModel<string>();

/** Emits */
const emit = defineEmits(['update:modelValue']);

/** Functions */
const onUpdate = (value: any) => {
  emit('update:modelValue', value);
};
</script>

<template>
  <div class="field-text" :data-id="'field-text-' + id">
    <PVFloatLabel>
      <!-- Password field -->
      <PVPassword
        v-if="type === 'password'"
        :id="id"
        v-model="modelValue"
        :disabled="disabled"
        :feedback="feedback"
        :toggle-mask="toggleMask"
        :class="{ 'p-invalid': error }"
        class="w-full"
        input-class="w-full"
        @update:model-value="onUpdate"
      >
        <template #footer>
          <slot name="footer">
            <template v-if="feedback">
              <p class="mt-2 text-sm">{{ $t('auth.passwordStrength.requirements') || 'Requirements:' }}</p>
              <ul class="pl-2 ml-2 mt-0 list-disc line-height-3 text-sm">
                <li>{{ $t('auth.passwordStrength.min') || 'At least 10 characters' }}</li>
                <li>{{ $t('auth.passwordStrength.upper') || 'At least one uppercase' }}</li>
                <li>{{ $t('auth.passwordStrength.numeric') || 'At least one numeric' }}</li>
                <li>{{ $t('auth.passwordStrength.symbol') || 'At least one symbol' }}</li>
              </ul>
            </template>
          </slot>
        </template>
      </PVPassword>

      <!-- Text field -->
      <PVInputText
        v-else
        :id="id"
        v-model="modelValue"
        :type="type"
        :disabled="disabled"
        :class="{ 'p-invalid': error }"
        class="w-full"
        @update:model-value="onUpdate"
      />

      <label :for="id">{{ label }}</label>
    </PVFloatLabel>
    
    <small v-if="error" class="p-error">{{ error }}</small>
  </div>
</template>

