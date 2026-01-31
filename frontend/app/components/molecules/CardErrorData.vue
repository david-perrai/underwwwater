<script setup lang="ts">
import { translations } from "@/i18n/index";

const { ERROR_DATA } = translations.en.PROFILE;
</script>

<template>
  <v-card
    :title="ERROR_DATA.TITLE"
    :subtitle="ERROR_DATA.SUBTITLE"
    :text="ERROR_DATA.TEXT"
    variant="tonal"
  ></v-card>
</template>
