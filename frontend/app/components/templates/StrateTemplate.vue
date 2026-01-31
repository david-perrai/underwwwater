<script setup lang="ts">
const props = defineProps<{
  title: string;
  subtitle?: string;
  icon?: string;
}>();
</script>

<template>
  <v-row :class="['mb-8']">
    <v-col>
      <v-card
        :title="props.title"
        :subtitle="props.subtitle"
        :append-icon="icon"
        :elevation="10"
        border
        rounded
      >
        <v-card-text>
          <slot name="strate"> </slot>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
