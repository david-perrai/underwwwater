<script setup lang="ts">
import { translations } from "@/i18n/index";

const { TITLE } = translations.en.GENERAL;
</script>

<template>
  <v-card
    :color="'primary'"
    :border="true"
    :elevation="10"
    :tag="'section'"
    width="100%"
    rounded
  >
    <h1 :class="['d-none']">{{ TITLE }}</h1>
    <slot name="card"></slot>
  </v-card>
</template>
