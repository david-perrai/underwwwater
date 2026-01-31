<script setup lang="ts">
const props = defineProps<{
  title: string;
  texts: string[];
}>();
</script>

<template>
  <article :class="['text-center']">
    <h2 :class="['text-h5', 'font-weight-light', 'mb-8']">
      {{ props.title }}
    </h2>

    <p v-for="text in props.texts" :key="text" :class="['mb-8']">
      {{ text }}
    </p>
  </article>
</template>
