<script setup lang="ts">
import { FormActions } from "@/types/models/form";
import { isLogged } from "@/composables/auth";
import { isMobile } from "@/composables/utils/isMobile";

const props = defineProps<{
  title: string;
  subtitle: string;
  image: string;
}>();
</script>

<template>
  <v-parallax
    :src="props.image"
    :scale="0.8"
    height="650"
    :class="['parallax_heading']"
  >
    <div
      :class="[
        'blurred_gradient',
        'd-flex',
        'flex-column',
        'fill-height',
        'justify-center',
        'align-center',
      ]"
    >
      <v-container :class="['text-center']" :tag="'article'">
        <h1
          :class="[
            'font-weight-bold',
            'mb-4',
            isMobile.value ? 'text-h4' : 'text-h2',
          ]"
        >
          {{ props.title }}
        </h1>
        <h2 :class="['text-h5', 'font-weight-light']">
          {{ props.subtitle }}
        </h2>

        <nav :class="['mt-15', 'd-flex', 'flex-wrap', 'justify-center']">
          <FormUserModal v-if="!isLogged()" :action="FormActions.REGISTER" />
          <FormUserModal v-if="!isLogged()" :action="FormActions.LOGIN" />
        </nav>
      </v-container>
    </div>
  </v-parallax>
</template>

<style lang="scss">
.blurred_gradient {
  background: linear-gradient(
    0deg,
    rgba(0, 10, 25, 1) 0%,
    rgba(0, 10, 25, 0) 100%
  );
}
</style>
