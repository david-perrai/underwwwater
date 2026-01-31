<script setup lang="ts">
const props = defineProps<{
  id: string;
  label: string;
}>();
</script>

<template>
  <v-col>
    <h4 :class="['font-weight-medium', 'text-subtitle-1', 'mb-5']">
      {{ props.label }}
    </h4>
    <v-radio-group
      @update:modelValue="$emit('formInputChange', props.id, $event)"
      :class="['d-flex', 'align-center', 'justify-center']"
      inline
    >
      <div
        v-for="index in 13"
        :key="index"
        :class="[
          'd-flex',
          'flex-column-reverse',
          'justify-center',
          'align-center',
          'mx-10',
        ]"
      >
        <v-radio :value="index" :class="['mt-2', 'mb-5']"></v-radio>
        <v-avatar
          :image="'/avatars/avatar' + index + '.png'"
          size="75"
        >
        </v-avatar>
      </div>
    </v-radio-group>
  </v-col>
</template>
