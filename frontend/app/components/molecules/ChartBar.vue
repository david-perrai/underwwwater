<script setup lang="ts">
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import Zoom from "chartjs-plugin-zoom";
import { GasData } from "@/types/charts/gas";
import { globalOptionsProvider } from "@/composables/charts/globalOptionsProvider";

const props = defineProps<{
  data: GasData["bar"];
  context: string;
}>();

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  Zoom
);
</script>

<template>
  <Bar
    :options="globalOptionsProvider(context, props.data)"
    :data="props.data"
    :chart-id="'bar'"
    :class="['chart_zoomable']"
  />
</template>
