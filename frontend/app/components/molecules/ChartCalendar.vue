<script setup lang="ts">
import type { CalendarData } from "@/types/charts/calendar";
import { CalendarHeatmap } from "vue3-calendar-heatmap";
import { translations } from "@/i18n/index";

const props = defineProps<{
  data: CalendarData["heatmap"];
}>();

const { LABEL } = translations.en.PROFILE.STRATE_CALENDAR;
</script>

<template>
  <div>{{ LABEL }}</div>
  <calendar-heatmap
    :values="props.data.items"
    :range-color="props.data.colors"
    :end-date="props.data.endDate"
    :round="4"
    :max="4"
    :noDataText="false"
    :tooltipUnit="'dives'"
  />
</template>

<style lang="scss">
.vch__container {
  .vch__legend {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .vch__external-legend-wrapper {
    margin: 0 8px;
  }
}
svg.vch__wrapper {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  line-height: 10px;
  width: 100%;
  .vch__months__labels__wrapper text.vch__month__label {
    font-size: 10px;
  }
  .vch__days__labels__wrapper text.vch__day__label,
  .vch__legend__wrapper text {
    font-size: 9px;
  }
  text.vch__month__label,
  text.vch__day__label,
  .vch__legend__wrapper text {
    fill: #767676;
  }
  rect.vch__day__square:focus {
    outline: none;
  }
  &.dark-mode {
    text.vch__month__label,
    text.vch__day__label,
    .vch__legend__wrapper text {
      fill: #000;
    }
  }
}
</style>
