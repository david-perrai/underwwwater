<script setup lang="ts">
/** Props */
interface Props {
  id: string;
  label: string;
  error?: string;
  disabled?: boolean;
  showTime?: boolean;
  hourFormat?: '12' | '24';
  dateFormat?: string;
}

const props = withDefaults(defineProps<Props>(), {
  showTime: false,
  hourFormat: '24',
  dateFormat: 'dd/mm/yy',
});

/** Model */
const modelValue = defineModel<Date | null>();

/** Emits */
const emit = defineEmits(['update:modelValue']);

/** Functions */
const onUpdate = (value: any) => {
  emit('update:modelValue', value);
};
</script>

<template>
  <div :class="['field-date']" :data-id="'field-date-' + id">
    <PVFloatLabel>
      <PVDatePicker
        :inputId="id"
        v-model="modelValue"
        :fluid="true"
        :showTime="showTime"
        :hourFormat="hourFormat"
        :dateFormat="dateFormat"
        :disabled="disabled"
        :class="{ 'p-invalid': error }"
        @update:model-value="onUpdate"
      />
      <label :for="id">{{ label }}</label>
    </PVFloatLabel>
    
    <small v-if="error" class="p-error">{{ error }}</small>
  </div>
</template>
