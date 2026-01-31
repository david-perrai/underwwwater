<script setup lang="ts">
import type { ThemesData } from "@/types/charts/themes";
import { computed } from "vue";

const props = defineProps<{
  data: ThemesData["progress"];
}>();

const height = computed(() => {
  const height =
    (400 - 2 * props.data.labels.length) / props.data.labels.length;
  return height > 50 ? 50 : height;
});
</script>

<template>
  <div>
    <div v-for="(token, index) in props.data.datasets[0].token" :key="token">
      <div v-if="props.data.datasets[0].percentage">
        <v-progress-linear
          :model-value="props.data.datasets[0].percentage[index]"
          :height="height"
          :id="'v-progress_' + token"
          :color="props.data.datasets[0].backgroundColor[index]"
          :bg-opacity="0.35"
          rounded
          rounded-bar
          :class="['chart_progress']"
          :style="{
            'background-image':
              'url(' +
              `/progress_banners/bar_${token}.png` +
              ')',
          }"
        >
          <template #default="{ value }">
            <div :class="['position-absolute']">
              <span>
                {{ props.data.labels[index] }} -
                {{ props.data.datasets[0].data[index] }}dives
              </span>

              <strong :class="['mx-2']">{{ Math.ceil(value) }}%</strong>
            </div>
          </template>
        </v-progress-linear>
      </div>
      <v-divider :class="['mb-1']"></v-divider>
    </div>
  </div>
</template>
