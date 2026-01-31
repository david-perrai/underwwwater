<script setup lang="ts">
import { reactive, ref } from "vue";
import { format } from "date-fns";
import { translations } from "@/i18n/index";

const props = defineProps<{
  id: string;
  label: string;
  type?: string;
  value: Date;
}>();

const emit = defineEmits<{
  (e: string, id: string, value: Date): void;
}>();

const errorText = ref("");

const { RULE_DATE } = translations.en.FORM_WORDING;

const date = reactive({
  value: format(props.value, "yyyy-MM-dd'T'HH:mm"),
});

const handleChange = () => {
  if (new Date(date.value).getTime() > new Date().getTime()) {
    date.value = format(new Date(), "yyyy-MM-dd'T'HH:mm");
    errorText.value = RULE_DATE;
  }
  emit("formInputChange", props.id, new Date(date.value));
};
</script>

<template>
  <fieldset :class="['form_controls--date', 'position-relative', 'pb-5']">
    <legend
      :class="[
        'position-absolute',
        'bg-primary',
        'text-caption',
        'color-primary',
        'mx-5',
        'px-1',
      ]"
    >
      {{ props.label }}
    </legend>
    <input v-model="date.value" :type="props.type" @change="handleChange()" />
    <div :class="['v-input__details']" v-show="errorText">
      <div :class="['v-messages']">
        <p :class="['v-messages__message', 'ml-4', 'color-warning']">
          {{ errorText }}
        </p>
      </div>
    </div>
  </fieldset>
</template>
