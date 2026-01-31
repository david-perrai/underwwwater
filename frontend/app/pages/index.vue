<script setup lang="ts">
import { translations } from "@/i18n/index";

const { SUBTITLE, DIVE_LOGGING, GET_STARTED } = translations.en.HOME;
const { TITLE } = translations.en.GENERAL;
</script>

<template>
  <BaseTemplate>
    <template #parallax>
      <ParallaxHeading
        :title="TITLE"
        :subtitle="SUBTITLE"
        :image="'/bg.jpg'"
      />
    </template>
    <template #main>
      <HomeParagraph :title="DIVE_LOGGING.TITLE" :texts="[DIVE_LOGGING.TEXT]" />
      <br />
      <HomeParagraph
        :title="GET_STARTED.TITLE"
        :texts="[GET_STARTED.TEXT, GET_STARTED.MORE]"
      />
    </template>
  </BaseTemplate>
</template>
