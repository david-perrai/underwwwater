<script setup lang="ts">
import { ref, onMounted } from "vue";
import { translations } from "@/i18n/index";

const scrolledToBottom = ref(false);
const { MADE, CREDITS, GITHUB } = translations.en.FOOTER;

const updateScroll = () => {
  scrolledToBottom.value =
    window.innerHeight + window.scrollY >= document.body.offsetHeight
      ? true
      : false;
};

onMounted(() => {
  window.addEventListener("scroll", updateScroll);
  window.addEventListener("resize", updateScroll);
});
</script>

<template>
  <v-bottom-navigation
    :tag="'footer'"
    :elevation="0"
    :class="[
      scrolledToBottom !== true ? 'bg-background' : 'bg-transparent',
      'bg-transition',
    ]"
  >
    <div
      :class="[
        'd-none',
        'd-md-flex',
        'flex-direction-row',
        'justify-center',
        'align-center',
      ]"
    >
      <span :class="['mr-1']">
        {{ CREDITS }}
      </span>
      <span>{{ MADE }}</span>
      <v-icon icon="$symfony" :class="['mx-1']" />
      <v-icon icon="$graphql" :class="['mx-1']" />
      <v-icon icon="$vuejs" :class="['mx-1']" />
      <v-icon icon="$vuetify" :class="['mx-1']" />
      |
    </div>
    <v-btn
      :variant="'text'"
      :size="'small'"
      :class="['d-flex']"
      :href="'https://github.com/Azimaet'"
    >
      <v-icon icon="$github" start />
      {{ GITHUB }}
    </v-btn>
  </v-bottom-navigation>
</template>
